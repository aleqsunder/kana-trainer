import React from 'react'
import {observer} from 'mobx-react-lite'
import {motion} from 'framer-motion'
import {getClassColor} from '@/utils/color'
import {CONTAINER_WIDTH} from '@/constants'
import {KanaKeyboardRaceEntry} from '@/types/kana'

interface KanaListProps {
    currentKanaIndex: number,
    kanaList: KanaKeyboardRaceEntry[]
}

const KanaList = observer(({currentKanaIndex, kanaList}: KanaListProps) => {
    return (
        <div className="keyboard-race-container">
            {kanaList.map((kana, index) => {
                const position: number = (index - currentKanaIndex) * CONTAINER_WIDTH - (CONTAINER_WIDTH / 2)
                const isActive: boolean = index === currentKanaIndex
                const classList: string[] = ['keyboard-race__item', getClassColor(kana.status)]

                return (
                    <motion.span
                        key={`kana-${index}-${kana.romaji}`}
                        className={classList.join(' ')}
                        animate={{
                            x: position,
                            y: '-50%',
                            opacity: isActive ? 1 : index > currentKanaIndex
                                ? .15 : Math.max(1 - Math.abs(index - currentKanaIndex) * 0.19, 0)
                        }}
                        transition={{type: 'spring', stiffness: 100, damping: 20}}>
                        {kana.displayedKana}
                    </motion.span>
                )
            })}
        </div>
    )
})

export default KanaList
