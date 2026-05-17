<template>
  <div class="legal-page">
    <div class="legal-inner">

      <RouterLink :to="{path: '/home', hash: '#contact'}" class="legal-back">
        ← back to portfolio
      </RouterLink>

      <h1 class="legal-h1"><span class="accent">Data</span> Protection</h1>

      <div class="legal-section">
        <h2 class="legal-h2">General Information</h2>
        <p class="legal-p">
          The following notes give a simple overview of what happens to your personal data when
          you visit this website. Personal data is any data with which you could be personally
          identified.
        </p>
      </div>

      <div class="legal-section">
        <h2 class="legal-h2">Data Collection on This Website</h2>
        <p class="legal-p">
          <strong style="color:var(--text)">Who is responsible for data collection?</strong><br />
          Data processing on this website is carried out by the website operator. Their contact
          details can be found in the imprint of this website.
        </p>
        <p class="legal-p">
          <strong style="color:var(--text)">How do we collect your data?</strong><br />
          Your data is collected, on the one hand, by you providing it to us. This could, for
          example, be data you enter in a contact form. Other data is collected automatically
          when you visit the website by our IT systems. This is mainly technical data (e.g.
          internet browser, operating system or time of page view).
        </p>
        <p class="legal-p">
          <strong style="color:var(--text)">What do we use your data for?</strong><br />
          Part of the data is collected to ensure the proper functioning of the website. Other
          data can be used to analyse how visitors use the site.
        </p>
      </div>

      <div class="legal-section">
        <h2 class="legal-h2">Your Rights</h2>
        <p class="legal-p">
          You always have the right to request information about your stored data, its origin,
          its recipients, and the purpose of its collection at no charge. You also have the right
          to request that it be corrected, blocked, or deleted. You can contact us at any time
          using the address given in the legal notice if you have further questions about the
          issue of privacy and data protection.
        </p>
      </div>

      <div class="legal-section">
        <h2 class="legal-h2">Contact</h2>
        <p class="legal-p">
          Kristof Kamin<br />
          Hein-Block-Str. 7, 21423 Drage<br />
          <a href="mailto:info@kristof-kamin.de">info@kristof-kamin.de</a>
        </p>
      </div>

    </div>

    <div class="legal-mini-footer">
      <RouterLink to="/home">Portfolio</RouterLink>
      <span style="color:var(--muted)">·</span>
      <RouterLink to="/imprint">Imprint</RouterLink>
      <span style="color:var(--muted)">·</span>
      <span>© {{ new Date().getFullYear() }} Kristof Kamin</span>
    </div>
  </div>
</template>