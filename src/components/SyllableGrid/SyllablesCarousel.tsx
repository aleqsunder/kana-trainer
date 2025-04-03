import {motion, AnimatePresence} from 'framer-motion'
import {SyllabaryEntry} from '@/types/kana'
import React from 'react'
import KanaStore from '@/stores/KanaStore'

const scriptRenderMap = {
    hiragana: (syllable: SyllabaryEntry | null) => (<span className="hiragana-character">{syllable?.hira}</span>),
    katakana: (syllable: SyllabaryEntry | null) => (<span className="katakana-character">{syllable?.kata}</span>),
    both: (syllable: SyllabaryEntry | null) => (
        <div className="dual-script">
            <span className="hiragana-character">{syllable?.hira}</span>
            <span className="dual-script__divider">/</span>
            <span className="katakana-character">{syllable?.kata}</span>
        </div>
    )
}

const SyllablesCarousel = () => (
    <div className="carousel">
        <AnimatePresence>
            {KanaStore.previousSyllables.map((syllable, index) => (
                <motion.div key={`prev-${syllable.romaji}-${index}`}
                    className="carousel__previous"
                    style={{zIndex: 2 - index}}
                    initial={{
                        scale: 1 - index * 0.4,
                        opacity: 0.6 - index * 0.3,
                        x: -150 * Math.pow(index, 0.8)
                    }}
                    animate={{
                        scale: 1 - (index + 1) * 0.4,
                        opacity: 0.6 - (index + 1) * 0.3,
                        x: -150 * Math.pow(index + 1, 0.8)
                    }}
                    transition={{type: 'spring', stiffness: 100, damping: 50}}>
                    {scriptRenderMap[KanaStore.script](syllable)}
                </motion.div>
            ))}
        </AnimatePresence>

        <motion.div key={`current-${KanaStore.currentSyllable?.romaji}`}
            className="carousel__current"
            initial={{scale: 0.9, opacity: 0}}
            animate={{scale: 1, opacity: 1, x: 0}}
            transition={{type: 'spring', stiffness: 100, damping: 10}}>
            {scriptRenderMap[KanaStore.script](KanaStore.currentSyllable)}
        </motion.div>
    </div>
)

export default SyllablesCarousel
