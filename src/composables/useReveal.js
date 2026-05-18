import { onMounted } from 'vue'

/**
 * Sets up IntersectionObservers that add the `visible` class to elements
 * matching the given selectors once they enter the viewport.
 *
 * @param {Array<{ selector: string, threshold?: number }>} targets
 */
export function useReveal(targets) {
    onMounted(() => {
        for (const { selector, threshold = 0.15 } of targets) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add('visible')
                        io.unobserve(e.target)
                    }
                })
            }, { threshold })

            document.querySelectorAll(selector).forEach(el => {
                // Already revealed (DOM node reused after reactive i18n update) — skip IO
                if (el.classList.contains('visible')) return
                io.observe(el)
            })
        }
    })
}

/**
 * Immediately marks any matching elements that are currently in the viewport
 * as visible. Call this (via nextTick) after a reactive data change that reuses
 * DOM nodes — e.g. a language switch — so entries already scrolled into view
 * don't stay hidden because their IntersectionObserver was already disconnected.
 *
 * @param {string[]} selectors
 */
export function reReveal(selectors) {
    for (const selector of selectors) {
        document.querySelectorAll(selector).forEach(el => {
            if (el.classList.contains('visible')) return
            const rect = el.getBoundingClientRect()
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('visible')
            }
        })
    }
}