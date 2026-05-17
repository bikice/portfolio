import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Tracks which section is currently in view and whether the page has scrolled.
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

        for (let i = sectionIds.length - 1; i >= 0; i--) {
            const el = document.getElementById(sectionIds[i])
            if (el && window.scrollY >= el.offsetTop - offset) {
                activeSection.value = sectionIds[i]
                break
            }
        }
    }

    onMounted(()  => window.addEventListener('scroll', onScroll, { passive: true }))
    onUnmounted(() => window.removeEventListener('scroll', onScroll))

    return { activeSection, isScrolled }
}