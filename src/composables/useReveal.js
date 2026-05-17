import { onMounted } from 'vue'

/**
 * Sets up IntersectionObservers that add the `visible` class to elements
 * matching the given selectors once they enter the viewport.
 *
 * @param {Array<{ selector: string, threshold?: number }>} targets
 *
 * Usage:
 *   useReveal([
 *     { selector: '.reveal, .reveal-stagger', threshold: 0.15 },
 *     { selector: '.tl-entry',                threshold: 0.10 },
 *   ])
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

            document.querySelectorAll(selector).forEach(el => io.observe(el))
        }
    })
}