<?php
// ── Config ────────────────────────────────────────────────────────────────────
const MAIL_TO         = 'info@kristof-kamin.de';
const MAIL_FROM       = 'info@kristof-kamin.de';
const MAIL_SUBJECT    = 'New message from kristof-kamin.de';

// Rate limiting
const RATE_LIMIT_DIR  = __DIR__ . '/rate_limit';   // writable directory for state files
const RATE_LIMIT_MAX  = 5;                          // max requests per window per IP
const RATE_LIMIT_WIN  = 600;                        // window in seconds (10 min)

// Field length caps
const MAX_NAME_LEN    = 100;
const MAX_EMAIL_LEN   = 254;
const MAX_MSG_LEN     = 5000;
// ─────────────────────────────────────────────────────────────────────────────

header('Content-Type: application/json');

// ── Helpers ───────────────────────────────────────────────────────────────────

function respond(int $code, bool $ok, string $error = ''): never {
    http_response_code($code);
    $payload = $ok ? ['ok' => true] : ['ok' => false, 'error' => $error];
    echo json_encode($payload);
    exit;
}

/**
 * File-based rate limiter (no Redis/APCu required).
 * One JSON file per IP stores an array of UNIX timestamps for recent requests.
 */
function check_rate_limit(string $ip): void {
    if (!is_dir(RATE_LIMIT_DIR)) {
        mkdir(RATE_LIMIT_DIR, 0700, true);
    }

    // Use a hash so the filename is filesystem-safe regardless of IPv6 format
    $file = RATE_LIMIT_DIR . '/' . hash('sha256', $ip) . '.json';
    $now  = time();

    // Load existing timestamps, prune expired ones
    $timestamps = [];
    if (file_exists($file)) {
        $raw = @file_get_contents($file);
        if ($raw !== false) {
            $timestamps = json_decode($raw, true) ?? [];
        }
    }

    $timestamps = array_values(
        array_filter($timestamps, fn(int $t) => ($now - $t) < RATE_LIMIT_WIN)
    );

    if (count($timestamps) >= RATE_LIMIT_MAX) {
        $retry_after = RATE_LIMIT_WIN - ($now - $timestamps[0]);
        header('Retry-After: ' . $retry_after);
        respond(429, false, 'too many requests');
    }

    $timestamps[] = $now;
    file_put_contents($file, json_encode($timestamps), LOCK_EX);
}

// ── Request validation ────────────────────────────────────────────────────────

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'method not allowed');
}

// Resolve real IP (single trusted proxy hop)
$ip = filter_var(
    $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0',
    FILTER_VALIDATE_IP
) ?: '0.0.0.0';

check_rate_limit($ip);

// Parse body
$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
    respond(400, false, 'invalid json');
}

$name    = trim($body['name']    ?? '');
$email   = trim($body['email']   ?? '');
$message = trim($body['message'] ?? '');

// Presence check
if ($name === '' || $email === '' || $message === '') {
    respond(400, false, 'missing fields');
}

// Length caps
if (strlen($name) > MAX_NAME_LEN || strlen($email) > MAX_EMAIL_LEN || strlen($message) > MAX_MSG_LEN) {
    respond(400, false, 'field too long');
}

// Email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, false, 'invalid email');
}

// Strip header-injection characters
$name  = str_replace(["\r", "\n"], '', $name);
$email = str_replace(["\r", "\n"], '', $email);

// ── Build and send mail ───────────────────────────────────────────────────────

$headers  = "From: Contact Form <" . MAIL_FROM . ">\r\n";
$headers .= "Reply-To: =?UTF-8?B?" . base64_encode($name) . "?= <{$email}>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$mail_body = "Name:    {$name}\n"
    . "Email:   {$email}\n"
    . "IP:      {$ip}\n"
    . str_repeat('-', 39) . "\n"
    . $message;

$sent = mail(MAIL_TO, MAIL_SUBJECT, $mail_body, $headers, '-f ' . MAIL_FROM);

if ($sent) {
    respond(200, true);
} else {
    respond(500, false, 'mail() failed');
}