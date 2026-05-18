import { ref, watch, isRef, toRef, onMounted, onUnmounted } from 'vue'

/**
 * Cycles through an array of phrases with a typewriter effect.
 * Accepts either a plain array or a reactive ref/computed.
 * When the phrases source changes (e.g. language switch) the effect restarts.
 *
 * @param {string[] | Ref<string[]>} phrasesSource
 * @param {{ typeSpeed?: number, deleteSpeed?: number, pauseMs?: number, startDelay?: number }} opts
 * @returns {{ text: Ref<string> }}
 */
export function useTypewriter(phrasesSource, {
    typeSpeed   = 62,
    deleteSpeed = 38,
    pauseMs     = 2200,
    startDelay  = 1400,
} = {}) {
    const text = ref('')
    let pi = 0, ci = 0, deleting = false, timer = null

    const phrasesRef = isRef(phrasesSource) ? phrasesSource : toRef({ value: phrasesSource }, 'value')

    function clearTimer() {
        if (timer) { clearTimeout(timer); timer = null }
    }

    function restart(delay = 600) {
        clearTimer()
        pi = 0; ci = 0; deleting = false; text.value = ''
        timer = setTimeout(tick, delay)
    }

    function tick() {
        const phrases = phrasesRef.value
        if (!phrases || phrases.length === 0) return
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
    onUnmounted(() => clearTimer())

    // Restart the effect whenever the phrases array changes (language switch)
    watch(phrasesRef, () => restart(), { deep: false })

    return { text }
}