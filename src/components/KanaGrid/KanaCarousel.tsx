import React from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {KanaEntry} from '@/types/kana'
import KanaStore from '@/stores/KanaStore'

const scriptRenderMap = {
    hiragana: (kana: KanaEntry) => <span className="hiragana-character">{kana.hira}</span>,
    katakana: (kana: KanaEntry) => <span className="katakana-character">{kana.kata}</span>,
    both: (kana: KanaEntry) => (
        <div className="dual-script">
            <span className="hiragana-character">{kana.hira}</span>
            <span className="dual-script__divider">/</span>
            <span className="katakana-character">{kana.kata}</span>
        </div>
    )
}

const helperRenderMap = {
    romaji: (kana: KanaEntry) => kana.romaji,
    cyrillic: (kana: KanaEntry) => kana.cyr,
    both: (kana: KanaEntry) => `${kana.romaji} / ${kana.cyr}`
}

interface KanaCarouselProps {
    kana: KanaEntry,
    previousKanaList: KanaEntry[],
    showHelper: boolean,
}

const KanaCarousel = ({kana, previousKanaList = [], showHelper}: KanaCarouselProps) => (
    <div className="carousel">
        <AnimatePresence>
            {previousKanaList.map((kana, index) => (
                <motion.div key={`prev-${kana.romaji}-${index}`}
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
                    {scriptRenderMap[KanaStore.script](kana)}
                </motion.div>
            ))}
        </AnimatePresence>

        <motion.div key={`current-${kana.romaji}`}
            className="carousel__current"
            initial={{scale: 0.9, opacity: 0}}
            animate={{scale: 1, opacity: 1, x: 0}}
            transition={{type: 'spring', stiffness: 100, damping: 10}}>
            {scriptRenderMap[KanaStore.script](kana)}
            {showHelper && (
                <span className="romaji-helper">
                    {helperRenderMap[KanaStore.inputSystem](kana)}
                </span>
            )}
        </motion.div>
    </div>
)

export default KanaCarousel
