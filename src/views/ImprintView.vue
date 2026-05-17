<template>
  <div class="legal-page">
    <div class="legal-inner">

      <RouterLink to="/home" class="legal-back">
        ← back to portfolio
      </RouterLink>

      <h1 class="legal-h1"><span class="accent">Imprint</span></h1>

      <div class="legal-section">
        <h2 class="legal-h2">Contact</h2>
        <p class="legal-p">
          Kristof Kamin<br />
          Hein-Block-Str. 7<br />
          21423 Drage
        </p>
        <p class="legal-p">
          Tel: 0179 / 74 79 711<br />
          E-Mail:
          <a href="mailto:info@kristof-kamin.de">info@kristof-kamin.de</a>
        </p>
      </div>

      <div class="legal-section">
        <h2 class="legal-h2">§ 1 Warnhinweis zu Inhalten</h2>
        <p class="legal-p">
          Die kostenlosen und frei zugänglichen Inhalte dieser Webseite wurden mit größtmöglicher
          Sorgfalt erstellt. Der Anbieter dieser Webseite übernimmt jedoch keine Gewähr für die
          Richtigkeit und Aktualität der bereitgestellten kostenlosen und frei zugänglichen
          journalistischen Ratgeber und Nachrichten.
        </p>
      </div>

      <div class="legal-section">
        <h2 class="legal-h2">§ 2 Externe Links</h2>
        <p class="legal-p">
          Diese Website enthält Verknüpfungen zu Websites Dritter ("externe Links"). Diese Websites
          unterliegen der Haftung der jeweiligen Betreiber. Der Anbieter hat bei der erstmaligen
          Verknüpfung der externen Links die fremden Inhalte daraufhin überprüft, ob etwaige
          Rechtsverstöße bestehen.
        </p>
      </div>

      <div class="legal-section">
        <h2 class="legal-h2">§ 3 Urheber- und Leistungsschutzrechte</h2>
        <p class="legal-p">
          Die auf dieser Website veröffentlichten Inhalte unterliegen dem deutschen Urheber- und
          Leistungsschutzrecht. Jede vom deutschen Urheber- und Leistungsschutzrecht nicht
          zugelassene Verwertung bedarf der vorherigen schriftlichen Zustimmung des Anbieters
          oder jeweiligen Rechteinhabers.
        </p>
        <p class="legal-p">
          Quelle:
          <a href="https://www.juraforum.de/impressum-generator/" target="_blank" rel="noopener">
            Impressum Muster von JuraForum.de
          </a>
        </p>
      </div>

    </div>

    <div class="legal-mini-footer">
      <RouterLink to="/home">Portfolio</RouterLink>
      <span style="color:var(--muted)">·</span>
      <RouterLink to="/data-protection">Data Protection</RouterLink>
      <span style="color:var(--muted)">·</span>
      <span>© {{ new Date().getFullYear() }} Kristof Kamin</span>
    </div>
  </div>
</template>