import { ref, computed, nextTick } from 'vue'
import { reReveal } from './useReveal.js'

// ── Singleton state (shared across all components) ────────────────────────
const lang = ref('de')

export function useI18n() {
    const t = computed(() => translations[lang.value])

    function setLang(l) {
        lang.value = l
        document.documentElement.lang = l
        // After Vue patches the DOM, reveal any in-viewport elements that lost
        // their `visible` class because their DOM node was recreated.
        nextTick(() => reReveal(['.reveal', '.reveal-stagger', '.tl-entry']))
    }

    function toggleLang() {
        setLang(lang.value === 'de' ? 'en' : 'de')
    }

    return { lang, t, setLang, toggleLang }
}

// ── All translations ───────────────────────────────────────────────────────
const translations = {

    // ════════════════════════════════════════════════
    //  GERMAN  (primary / default)
    // ════════════════════════════════════════════════
    de: {

        // Nav
        nav: {
            home:    'Start',
            about:   'Über mich',
            skills:  'Fähigkeiten',
            work:    'Karriere',
            contact: 'Kontakt',
            back:    '← Zurück',
            backHome:'← Zurück zur Startseite',
        },

        // Hero
        hero: {
            tag: '// Webentwickler & Programmierer',
            scrollHint: 'Scrollen zum Entdecken',
            typewriter: [
                'Webentwicklung seit 2008.',
                'Frontend-Engineering auf höchstem Niveau.',
                'JavaScript ist mein Zuhause.',
                'Vue, SASS, Linux — alles in einem Tag.',
            ],
        },

        // About
        about: {
            label:   'Über mich',
            title:   'Wer ich',
            titleAccent: 'bin',
            badge:   'Dev seit 2001',
            available: 'Offen für Projekte',
            bio: 'Seit 2008 bin ich in der Webentwicklung tätig — ich entwickle moderne Websites und Web-Applikationen, einschließlich mobiler Lösungen. JavaScript ist seit vielen Jahren meine primäre Umgebung. Ich habe alles von RIA-Office-Suiten und Cloud-Speicherplattformen bis hin zu Social-Media-Netzwerken und Freelance-Projekten realisiert.',
            meta: [
                { key: 'geboren',   val: '1. November 1984'                                   },
                { key: 'wohnort',   val: 'Deutschland'                                        },
                { key: 'sprachen',  val: 'Deutsch, Englisch'                                  },
                { key: 'fokus',     val: 'Web-Entwicklung · JavaScript · Frontend-Engineering · SEO' },
            ],
        },

        // Skills
        skills: {
            label: 'Expertise',
            title: 'Meine',
            titleAccent: 'Fähigkeiten',
            cats: [
                {
                    id: 'backend', name: 'Backend & DB', avgPct: 98,
                    skills: [
                        { name: 'PHP',              pct: 100 },
                        { name: 'MySQL / Doctrine', pct: 95  },
                        { name: 'Node',             pct: 80  },
                        { name: 'Java',             pct: 45  },
                    ],
                },
                {
                    id: 'javascript', name: 'JavaScript', avgPct: 92,
                    skills: [
                        { name: 'JavaScript (ES6+)', pct: 100 },
                        { name: 'TypeScript',        pct: 95  },
                        { name: 'Vue2 / Vue3',       pct: 90  },
                        { name: 'React',             pct: 70  },
                        { name: 'Angular',           pct: 60  },
                    ],
                },
                {
                    id: 'frontend', name: 'Frontend', avgPct: 88,
                    skills: [
                        { name: 'HTML / CSS',           pct: 95 },
                        { name: 'SASS / SCSS',          pct: 90 },
                        { name: 'Bootstrap / Tailwind', pct: 80 },
                        { name: 'Responsive / Mobile',  pct: 75 },
                    ],
                },
                {
                    id: 'tools', name: 'Tools & Systeme', avgPct: 82,
                    skills: [
                        { name: 'Jetbrains PhpStorm',     pct: 100 },
                        { name: 'Git',                    pct: 95  },
                        { name: 'Linux-Administration',   pct: 90  },
                        { name: 'PHPUnit / CSFixer',      pct: 90  },
                        { name: 'Selenium / Codeception', pct: 85  },
                    ],
                },
                {
                    id: 'seo', name: 'Suchmaschinenoptimierung', avgPct: 70,
                    skills: [
                        { name: 'Strukturierte Daten',   pct: 100 },
                        { name: 'Google Search Console', pct: 80  },
                        { name: 'Adwords / Keywords',    pct: 75  },
                    ],
                },
            ],
        },

        // Career
        work: {
            label:       'Karriere',
            title:       'Arbeit &',
            titleAccent: 'Ausbildung',
            legendWork:  'Arbeit',
            legendEdu:   'Ausbildung',
            typeWork:    '// arbeit',
            typeEdu:     '// ausbildung',
            timeline: [
                { period: '2020 – heute', company: 'Books on Demand GmbH',            type: 'work', description: 'Senior Full Stack Developer — Backend mit PHP, Symfony, TYPO3. Frontend mit Vue2/Vue3, Bootstrap.' },
                { period: '2017 – 2020',  company: 'Open-Xchange AG',                 type: 'work', description: 'Web Application Developer — Entwicklung einer RIA-Office-Suite und cloudbasierten Speicherplattform' },
                { period: '2014 – 2017',  company: 'motory GmbH',                     type: 'work', description: 'Full Stack Developer — Entwicklung einer Social-Media-Plattform' },
                { period: '2012 – 2014',  company: 'onitec Werbeagentur GmbH',        type: 'work', description: 'Full Stack Developer — Websites, Webshops und Webanwendungen. Linux-Administration und Netzwerke.' },
                { period: '2008 – heute', company: 'Freiberuflich',                   type: 'work', description: 'Web Developer — Entwicklung von Websites und Webshops für Kunden' },
                { period: '2008 – 2014',  company: 'Jade Hochschule',                 type: 'edu',  description: 'Bachelor of Science: Wirtschaftsinformatik' },
                { period: '2006 – 2009',  company: 'Hermes Logistik Bremen',          type: 'work', description: 'Erstellung von Karten und Routensystemen für die Paketzustellung' },
                { period: '2004 – 2005',  company: 'Rheinmetall Defence Electronics', type: 'work', description: 'IT-Spezialist — Fernsteuerung für Kraftwerk-Simulator, taktisches Navigationssystem, Schnittstelle zu einem mobilen Roboter' },
                { period: '2001 – 2004',  company: 'Rheinmetall Defence Electronics', type: 'edu',  description: 'Ausbildung: Fachinformatiker für Anwendungsentwicklung' },
            ],
        },

        // Contact
        contact: {
            label:       'Kontakt',
            title:       'Lass uns',
            titleAccent: 'reden',
            blurb:       'Ob Sie ein Projekt im Sinn haben, eine Frage haben oder einfach in Kontakt treten möchten — ich freue mich immer von Ihnen zu hören. Schreiben Sie mir oder kontaktieren Sie mich direkt per E-Mail.',
            namePlaceholder:    'Ihr Name',
            emailPlaceholder:   'ihre@email.de',
            messagePlaceholder: 'Ihre Nachricht…',
            nameLabel:    'Name',
            emailLabel:   'E-Mail',
            messageLabel: 'Nachricht',
            send:         'Nachricht senden →',
            sending:      'Wird gesendet…',
            successMsg:   (name) => `Danke, ${name}! Ihre Nachricht wurde gesendet. Ich melde mich bald.`,
            errorMsg:     'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie mir direkt.',
        },

        // Footer
        footer: {
            tagline:    '// Webentwickler & Programmierer\nseit 2001',
            available:  'Offen für Projekte',
            imprint:    'Impressum',
            dataProtection: 'Datenschutz',
            nav: [
                { href: '#hero',    label: 'Start'       },
                { href: '#about',   label: 'Über mich'   },
                { href: '#skills',  label: 'Fähigkeiten' },
                { href: '#work',    label: 'Karriere'    },
                { href: '#contact', label: 'Kontakt'     },
            ],
        },
        // Imprint
        imprint: {
            back:  '← zurück zum Portfolio',
            title: 'Impressum',
            miniFooterPortfolio:    'Portfolio',
            miniFooterDataProtect:  'Datenschutz',
            sections: [
                {
                    heading: 'Kontakt',
                    paragraphs: [
                        'Kristof Kamin<br />Hein-Block-Str. 7<br />21423 Drage',
                        'E-Mail: <a href="mailto:info@kristof-kamin.de">info@kristof-kamin.de</a>',
                    ],
                },
                {
                    heading: '§ 1 Warnhinweis zu Inhalten',
                    paragraphs: [
                        'Die kostenlosen und frei zugänglichen Inhalte dieser Webseite wurden mit größtmöglicher Sorgfalt erstellt. Der Anbieter dieser Webseite übernimmt jedoch keine Gewähr für die Richtigkeit und Aktualität der bereitgestellten kostenlosen und frei zugänglichen journalistischen Ratgeber und Nachrichten.',
                    ],
                },
                {
                    heading: '§ 2 Externe Links',
                    paragraphs: [
                        'Diese Website enthält Verknüpfungen zu Websites Dritter ("externe Links"). Diese Websites unterliegen der Haftung der jeweiligen Betreiber. Der Anbieter hat bei der erstmaligen Verknüpfung der externen Links die fremden Inhalte daraufhin überprüft, ob etwaige Rechtsverstöße bestehen.',
                    ],
                },
                {
                    heading: '§ 3 Urheber- und Leistungsschutzrechte',
                    paragraphs: [
                        'Die auf dieser Website veröffentlichten Inhalte unterliegen dem deutschen Urheber- und Leistungsschutzrecht. Jede vom deutschen Urheber- und Leistungsschutzrecht nicht zugelassene Verwertung bedarf der vorherigen schriftlichen Zustimmung des Anbieters oder jeweiligen Rechteinhabers.',
                        'Quelle: <a href="https://www.juraforum.de/impressum-generator/" target="_blank" rel="noopener">Impressum Muster von JuraForum.de</a>',
                    ],
                },
            ],
        },

        // Data Protection
        dataProtection: {
            back:  '← zurück zum Portfolio',
            title: 'Datenschutz',
            miniFooterPortfolio: 'Portfolio',
            miniFooterImprint:   'Impressum',
            sections: [
                {
                    heading: 'Allgemeine Hinweise',
                    paragraphs: [
                        'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.',
                    ],
                },
                {
                    heading: 'Datenerfassung auf dieser Website',
                    paragraphs: [
                        '<strong>Wer ist verantwortlich für die Datenerfassung?</strong><br />Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.',
                        '<strong>Wie erfassen wir Ihre Daten?</strong><br />Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.&nbsp;B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.&nbsp;B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).',
                        '<strong>Wofür nutzen wir Ihre Daten?</strong><br />Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können verwendet werden, um das Nutzerverhalten zu analysieren.',
                    ],
                },
                {
                    heading: 'Ihre Rechte',
                    paragraphs: [
                        'Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.',
                    ],
                },
                {
                    heading: 'Kontakt',
                    paragraphs: [
                        'Kristof Kamin<br />Hein-Block-Str. 7, 21423 Drage<br /><a href="mailto:info@kristof-kamin.de">info@kristof-kamin.de</a>',
                    ],
                },
            ],
        },
    },

    // ════════════════════════════════════════════════
    //  ENGLISH
    // ════════════════════════════════════════════════
    en: {

        // Nav
        nav: {
            home:    'Home',
            about:   'About',
            skills:  'Skills',
            work:    'Work',
            contact: 'Contact',
            back:    '← Back',
            backHome:'← Back home',
        },

        // Hero
        hero: {
            tag: '// web developer & programmer',
            scrollHint: 'scroll to explore',
            typewriter: [
                'Building the web since 2008.',
                'Frontend engineering, done right.',
                'JavaScript is home.',
                "Vue, SASS, Linux — all in a day's work.",
            ],
        },

        // About
        about: {
            label:   'About me',
            title:   'Who I',
            titleAccent: 'Am',
            badge:   'Dev since 2001',
            available: 'Available for projects',
            bio: "Since 2008 I've been working in the web development space — building modern websites and web applications, including the mobile domain. For many years JavaScript has been my primary environment. I've shipped everything from RIA office suites and cloud-storage platforms to social-media networks and freelance client projects.",
            meta: [
                { key: 'born',      val: '1st November, 1984'                                  },
                { key: 'based in',  val: 'Germany'                                             },
                { key: 'languages', val: 'German, English'                                     },
                { key: 'focus',     val: 'Web Development · JavaScript · Frontend Engineering · SEO' },
            ],
        },

        // Skills
        skills: {
            label: 'Expertise',
            title: 'My',
            titleAccent: 'Skills',
            cats: [
                {
                    id: 'backend', name: 'Backend & DB', avgPct: 98,
                    skills: [
                        { name: 'PHP',              pct: 100 },
                        { name: 'MySQL / Doctrine', pct: 95  },
                        { name: 'Node',             pct: 80  },
                        { name: 'Java',             pct: 45  },
                    ],
                },
                {
                    id: 'javascript', name: 'JavaScript', avgPct: 92,
                    skills: [
                        { name: 'JavaScript (ES6+)', pct: 100 },
                        { name: 'TypeScript',        pct: 95  },
                        { name: 'Vue2 / Vue3',       pct: 90  },
                        { name: 'React',             pct: 70  },
                        { name: 'Angular',           pct: 60  },
                    ],
                },
                {
                    id: 'frontend', name: 'Frontend', avgPct: 88,
                    skills: [
                        { name: 'HTML / CSS',           pct: 95 },
                        { name: 'SASS / SCSS',          pct: 90 },
                        { name: 'Bootstrap / Tailwind', pct: 80 },
                        { name: 'Responsive / Mobile',  pct: 75 },
                    ],
                },
                {
                    id: 'tools', name: 'Tools & Systems', avgPct: 82,
                    skills: [
                        { name: 'Jetbrains PhpStorm',     pct: 100 },
                        { name: 'Git',                    pct: 95  },
                        { name: 'Linux Administration',   pct: 90  },
                        { name: 'PHPUnit / CSFixer',      pct: 90  },
                        { name: 'Selenium / Codeception', pct: 85  },
                    ],
                },
                {
                    id: 'seo', name: 'Search Engine Optimization', avgPct: 70,
                    skills: [
                        { name: 'Structured Data',        pct: 100 },
                        { name: 'Google Search Console',  pct: 80  },
                        { name: 'Adwords / Keywords',     pct: 75  },
                    ],
                },
            ],
        },

        // Career
        work: {
            label:       'Career',
            title:       'Work &',
            titleAccent: 'Education',
            legendWork:  'Work',
            legendEdu:   'Education',
            typeWork:    '// work',
            typeEdu:     '// edu',
            timeline: [
                { period: '2020 – present', company: 'Books on Demand GmbH',            type: 'work', description: 'Senior Full Stack Developer — Backend with PHP, Symfony, TYPO3. Frontend with Vue2/Vue3, Bootstrap.' },
                { period: '2017 – 2020',    company: 'Open-Xchange AG',                 type: 'work', description: 'Web Application Developer — Developing a RIA Office Suite and cloud-based storage platform' },
                { period: '2014 – 2017',    company: 'motory GmbH',                     type: 'work', description: 'Full Stack Developer — Developing a social media platform' },
                { period: '2012 – 2014',    company: 'onitec Werbeagentur GmbH',        type: 'work', description: 'Full Stack Developer — Websites, webshops and web applications. Linux administration and networking.' },
                { period: '2008 – present', company: 'Freelancer',                      type: 'work', description: 'Web Developer — Development of websites and webshops for clients' },
                { period: '2008 – 2014',    company: 'Jade Hochschule',                 type: 'edu',  description: 'Bachelor of Science: Economic Computer Science' },
                { period: '2006 – 2009',    company: 'Hermes Logistik Bremen',          type: 'work', description: 'Creating maps and route systems for package delivery' },
                { period: '2004 – 2005',    company: 'Rheinmetall Defence Electronics', type: 'work', description: 'IT Specialist — Remote control for power plant simulator, tactical navigation system, interface to a mobile robot' },
                { period: '2001 – 2004',    company: 'Rheinmetall Defence Electronics', type: 'edu',  description: 'Education: IT Specialist for Application Development' },
            ],
        },

        // Contact
        contact: {
            label:       'Get in touch',
            title:       "Let's",
            titleAccent: 'Talk',
            blurb:       "Whether you have a project in mind, a question, or just want to connect — I'm always happy to hear from you. Drop me a message or reach out directly by email.",
            namePlaceholder:    'Your name',
            emailPlaceholder:   'your@email.com',
            messagePlaceholder: 'Your message…',
            nameLabel:    'Name',
            emailLabel:   'Email',
            messageLabel: 'Message',
            send:         'Send Message →',
            sending:      'Sending…',
            successMsg:   (name) => `Thanks ${name}! Your message was sent. I'll get back to you soon.`,
            errorMsg:     'Something went wrong. Please try again or email me directly.',
        },

        // Footer
        footer: {
            tagline:    '// web developer & programmer\nsince 2001',
            available:  'Available for projects',
            imprint:    'Imprint',
            dataProtection: 'Data Protection',
            nav: [
                { href: '#hero',    label: 'Home'    },
                { href: '#about',   label: 'About'   },
                { href: '#skills',  label: 'Skills'  },
                { href: '#work',    label: 'Work'    },
                { href: '#contact', label: 'Contact' },
            ],
        },
        // Imprint
        imprint: {
            back:  '← back to portfolio',
            title: 'Imprint',
            miniFooterPortfolio:   'Portfolio',
            miniFooterDataProtect: 'Data Protection',
            sections: [
                {
                    heading: 'Contact',
                    paragraphs: [
                        'Kristof Kamin<br />Hein-Block-Str. 7<br />21423 Drage',
                        'E-Mail: <a href="mailto:info@kristof-kamin.de">info@kristof-kamin.de</a>',
                    ],
                },
                {
                    heading: '§ 1 Disclaimer of Content',
                    paragraphs: [
                        'The free and freely accessible content of this website has been created with the greatest possible care. However, the provider of this website accepts no liability for the accuracy and topicality of the provided free and freely accessible journalistic guides and news.',
                    ],
                },
                {
                    heading: '§ 2 External Links',
                    paragraphs: [
                        'This website contains links to third-party websites ("external links"). These websites are subject to the liability of their respective operators. The provider has checked the third-party content for any legal violations when first linking to the external links.',
                    ],
                },
                {
                    heading: '§ 3 Copyright',
                    paragraphs: [
                        'The content published on this website is subject to German copyright and ancillary copyright law. Any exploitation not permitted by German copyright and ancillary copyright law requires the prior written consent of the provider or the respective rights holder.',
                        'Source: <a href="https://www.juraforum.de/impressum-generator/" target="_blank" rel="noopener">Imprint template by JuraForum.de</a>',
                    ],
                },
            ],
        },

        // Data Protection
        dataProtection: {
            back:  '← back to portfolio',
            title: 'Data Protection',
            miniFooterPortfolio: 'Portfolio',
            miniFooterImprint:   'Imprint',
            sections: [
                {
                    heading: 'General Information',
                    paragraphs: [
                        'The following notes give a simple overview of what happens to your personal data when you visit this website. Personal data is any data with which you could be personally identified.',
                    ],
                },
                {
                    heading: 'Data Collection on This Website',
                    paragraphs: [
                        '<strong>Who is responsible for data collection?</strong><br />Data processing on this website is carried out by the website operator. Their contact details can be found in the imprint of this website.',
                        '<strong>How do we collect your data?</strong><br />Your data is collected, on the one hand, by you providing it to us. This could, for example, be data you enter in a contact form. Other data is collected automatically when you visit the website by our IT systems. This is mainly technical data (e.g. internet browser, operating system or time of page view).',
                        '<strong>What do we use your data for?</strong><br />Part of the data is collected to ensure the proper functioning of the website. Other data can be used to analyse how visitors use the site.',
                    ],
                },
                {
                    heading: 'Your Rights',
                    paragraphs: [
                        'You always have the right to request information about your stored data, its origin, its recipients, and the purpose of its collection at no charge. You also have the right to request that it be corrected, blocked, or deleted. You can contact us at any time using the address given in the legal notice if you have further questions about the issue of privacy and data protection.',
                    ],
                },
                {
                    heading: 'Contact',
                    paragraphs: [
                        'Kristof Kamin<br />Hein-Block-Str. 7, 21423 Drage<br /><a href="mailto:info@kristof-kamin.de">info@kristof-kamin.de</a>',
                    ],
                },
            ],
        },
    },
}