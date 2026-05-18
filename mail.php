<?php
// ── Config ────────────────────────────────────────────────────────────────────
const TO      = 'info@kristof-kamin.de';
const SUBJECT = 'New message from kristof-kamin.de';
// ─────────────────────────────────────────────────────────────────────────────

header('Content-Type: application/json');

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method not allowed']);
    exit;
}

// Parse JSON body
$body = json_decode(file_get_contents('php://input'), true);

$name    = trim($body['name']    ?? '');
$email   = trim($body['email']   ?? '');
$message = trim($body['message'] ?? '');

// Basic validation
if (!$name || !$email || !$message) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'missing fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid email']);
    exit;
}

// Sanitise — strip any header-injection attempts
$name    = str_replace(["\r", "\n"], '', $name);
$email   = str_replace(["\r", "\n"], '', $email);

// Build mail
$headers  = "From: =?UTF-8?B?" . base64_encode($name) . "?= <{$email}>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$mailBody = "Name:    {$name}\n"
    . "Email:   {$email}\n"
    . "---------------------------------------\n"
    . $message;

$sent = mail(TO, SUBJECT, $mailBody, $headers);

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'mail() failed']);
}