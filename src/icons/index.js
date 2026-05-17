import { h } from 'vue'

export const IconLinkedIn = {
    props: ['size'],
    render() {
        const s = this.size || 14
        return h('svg', { width: s, height: s, viewBox: '0 0 24 24', fill: 'currentColor' }, [
            h('path', { d: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' }),
            h('circle', { cx: 4, cy: 4, r: 2 }),
        ])
    },
}

export const IconGitHub = {
    props: ['size'],
    render() {
        const s = this.size || 14
        return h('svg', { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
            h('path', { d: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22' }),
        ])
    },
}

export const IconCodePen = {
    props: ['size'],
    render() {
        const s = this.size || 14
        return h('svg', { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
            h('polygon', { points: '12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2' }),
            h('line', { x1: 12, y1: 22, x2: 12, y2: 15.5 }),
            h('polyline', { points: '22 8.5 12 15.5 2 8.5' }),
            h('polyline', { points: '2 15.5 12 8.5 22 15.5' }),
            h('line', { x1: 12, y1: 2, x2: 12, y2: 8.5 }),
        ])
    },
}

export const IconXing = {
    props: ['size'],
    render() {
        const s = this.size || 14
        return h('svg', { width: s, height: s, viewBox: '0 0 24 24', fill: 'currentColor' }, [
            h('path', { d: 'M6.228 5.306L4 9.04l5.127 8.933H13L7.867 9.04 10.098 5.306H6.228zm8.4-4.306l-5.12 8.908L15.827 21H20l-6.303-11.092 5.12-8.908H14.627z' }),
        ])
    },
}

export const IconMail = {
    props: ['size'],
    render() {
        const s = this.size || 14
        return h('svg', { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
            h('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }),
            h('polyline', { points: '22,6 12,13 2,6' }),
        ])
    },
}

export const socials = [
    { url: 'https://www.linkedin.com/in/kristof-kamin',  label: 'LinkedIn', icon: IconLinkedIn },
    { url: 'https://github.com/bikice',                  label: 'GitHub',   icon: IconGitHub   },
    { url: 'https://codepen.io/BiKICE',                  label: 'CodePen',  icon: IconCodePen  },
    { url: 'https://www.xing.com/profile/Kristof_Kamin', label: 'Xing',     icon: IconXing     },
]