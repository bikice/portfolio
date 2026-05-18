import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Tracks which section is currently in view, keeps the URL hash in sync,
 * and reports whether the page has scrolled past a threshold.
 *
 * @param {string[]} sectionIds   Ordered list of element ids to spy on.
 * @param {{ offset?: number, scrolledAt?: number }} opts
 * @returns {{ activeSection: Ref<string>, isScrolled: Ref<boolean> }}
 */
export function useScrollSpy(sectionIds, { offset = 160, scrolledAt = 60 } = {}) {
    const activeSection = ref(sectionIds[0] ?? '')
    const isScrolled    = ref(false)

    function onScroll() {
        isScrolled.value = window.scrollY > scrolledAt

        const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2

        for (let i = sectionIds.length - 1; i >= 0; i--) {
            const el = document.getElementById(sectionIds[i])
            const isLast = i === sectionIds.length - 1
            if (el && (window.scrollY >= el.offsetTop - offset || (isLast && atBottom))) {
                const id = sectionIds[i]
                if (activeSection.value !== id) {
                    activeSection.value = id
                    // Sync the URL hash without triggering a router navigation
                    // or adding a new browser-history entry.
                    const hash = id === sectionIds[0] ? '' : `#${id}`
                    history.replaceState(null, '', hash || window.location.pathname)
                }
                break
            }
        }
    }

    onMounted(()  => window.addEventListener('scroll', onScroll, { passive: true }))
    onUnmounted(() => window.removeEventListener('scroll', onScroll))

    return { activeSection, isScrolled }
}