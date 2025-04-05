import {observer} from 'mobx-react-lite'
import {KanaKeyboardRaceEntry} from '@/types/kana'
import {motion} from 'framer-motion'
import {containerVariants, itemVariants, progressVariants} from '@/components/KeyboardRace/_animations'
import {formatTime} from '@/utils/time'

interface EndGameWindowProps {
    kanaList: KanaKeyboardRaceEntry[],
    timeStart: number,
    timeEnd: number,
}

interface KanaListStreakReduceProps {
    maxStreak: number
    currentStreak: number
    correctKanaCount: number
}

const initialStreak: KanaListStreakReduceProps = {
    maxStreak: 0,
    currentStreak: 0,
    correctKanaCount: 0,
}

const EndGameWindow = observer(({ kanaList, timeStart, timeEnd }: EndGameWindowProps) => {
    const totalSeconds = (timeEnd - timeStart) / 1000
    const time = formatTime(totalSeconds)
    const {maxStreak, correctKanaCount} = kanaList.reduce<KanaListStreakReduceProps>(
        (result, kana) => {
            const isCorrect = kana.status === 'success'
            const currentStreak = isCorrect ? result.currentStreak + 1 : 0

            return {
                maxStreak: Math.max(result.maxStreak, currentStreak),
                correctKanaCount: isCorrect ? result.correctKanaCount + 1 : result.correctKanaCount,
                currentStreak
            }
        },
        {...initialStreak}
    )

    const percentage = Math.round((correctKanaCount / kanaList.length) * 100)
    const kanaPerSecond = (correctKanaCount / totalSeconds).toFixed(1)

    return (
        <motion.div className="end-game" initial="hidden" animate="visible" variants={containerVariants}>
            <motion.h2 className="end-game__title" variants={itemVariants}>🎉 Отлично! 🎉</motion.h2>

            <motion.div className="end-game__grid" variants={containerVariants}>
                <motion.div className="end-game__card" variants={itemVariants}>
                    <div className="end-game__label">общее время</div>
                    <div className="end-game__value">{time}</div>
                </motion.div>

                <motion.div className="end-game__card end-game__card--accent" variants={itemVariants}>
                    <div className="end-game__label">макс. серия</div>
                    <div className="end-game__value">
                        {maxStreak}
                        <span className="end-game__value-part">/{kanaList.length}</span>
                    </div>
                </motion.div>

                <motion.div className="end-game__card" variants={itemVariants}>
                    <div className="end-game__label">точность</div>
                    <div className="end-game__value">{percentage}%</div>
                </motion.div>

                <motion.div className="end-game__card end-game__card--accent" variants={itemVariants}>
                    <div className="end-game__label">кан в секунду</div>
                    <div className="end-game__value">{kanaPerSecond}</div>
                </motion.div>
            </motion.div>

            <motion.div className="end-game__progress">
                <div className="end-game__progress-background"/>
                <motion.div className="end-game__progress-bar" variants={progressVariants} custom={percentage}/>
                <motion.div className="end-game__progress-text" variants={itemVariants}>
                    Написано верно <b>{correctKanaCount}</b> из <b>{kanaList.length}</b> кан
                </motion.div>
            </motion.div>
        </motion.div>
    )
})

export default EndGameWindow
