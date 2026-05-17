import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Cycles through an array of phrases with a typewriter effect.
 *
 * @param {string[]} phrases
 * @param {{ typeSpeed?: number, deleteSpeed?: number, pauseMs?: number, startDelay?: number }} opts
 * @returns {{ text: Ref<string> }}
 */
export function useTypewriter(phrases, {
    typeSpeed   = 62,
    deleteSpeed = 38,
    pauseMs     = 2200,
    startDelay  = 1400,
} = {}) {
    const text = ref('')
    let pi = 0, ci = 0, deleting = false, timer = null

    function tick() {
        const phrase = phrases[pi]
        if (!deleting) {
            text.value = phrase.slice(0, ++ci)
            if (ci === phrase.length) {
                deleting = true
                timer = setTimeout(tick, pauseMs)
                return
            }
        } else {
            text.value = phrase.slice(0, --ci)
            if (ci === 0) {
                deleting = false
                pi = (pi + 1) % phrases.length
            }
        }
        timer = setTimeout(tick, deleting ? deleteSpeed : typeSpeed)
    }

    onMounted(()  => { timer = setTimeout(tick, startDelay) })
    onUnmounted(() => clearTimeout(timer))

    return { text }
}