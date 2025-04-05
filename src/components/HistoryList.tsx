import {observer} from 'mobx-react-lite'
import KanaStore from '../stores/KanaStore'
import {AnimatePresence, motion} from 'framer-motion'
import {listOfKana} from '@/data/listOfKana'
import {useState} from 'react'
import ExpandButton from '@/components/ExpandButton'

const HISTORY_LIMIT = 5

const HistoryList = observer(() => {
    const [expanded, setExpanded] = useState(false)
    const history = Array.from(KanaStore.history.entries())
        .sort((a, b) => b[1] - a[1])

    const handleClearHistory = () => {
        KanaStore.history.clear()
    }

    const enteredKana = [KanaStore.enteredKanaForAllTime]
    if (KanaStore.enteredKanaPerSession !== KanaStore.enteredKanaForAllTime) {
        enteredKana.unshift(KanaStore.enteredKanaPerSession)
    }

    return (
        <div className="history-panel">
            <div className="history-panel__header">
                <span className="session-stats">
                    {enteredKana.map((count, index) => (
                        <span key={index} className="session-stats__item">
                            {count}
                            {index < enteredKana.length - 1 && (
                                <span className="session-stats__divider">/</span>
                            )}
                        </span>
                    ))}
                </span>
                {history.length > 0 && (
                    <motion.button className="btn btn--clear" onClick={handleClearHistory}
                        whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                        Очистить
                    </motion.button>
                )}
            </div>

            {history.length === 0 ? (
                <div className="history-panel__empty-state">
                    <span className="history-panel__empty-state__title">История</span>
                    <p>Пока нет ответов</p>
                </div>
            ) : (
                <div className="history-panel__content">
                    <div className="history-panel__content__header">
                        <span>Кана</span>
                        <span>Попыток</span>
                    </div>
                    <AnimatePresence>
                        <motion.ul
                            className="history-panel__items"
                            initial="collapsed"
                            animate={expanded ? 'open' : 'collapsed'}
                            variants={{
                                open: {opacity: 1, height: 'auto'},
                                collapsed: {opacity: 1, height: 180}
                            }}
                            transition={{duration: 0.3}}>
                            {history.map(([romaji, count]) => {
                                const kana = listOfKana.find(s => s.romaji === romaji)
                                if (!kana) {
                                    return <li key={romaji}>...</li>
                                }

                                const kanaArray = KanaStore.script === 'both'
                                    ? [kana.hira, kana.kata]
                                    : [KanaStore.script === 'hiragana' ? kana.hira : kana.kata]

                                return (
                                    <motion.li key={romaji} className="history-panel__items__item"
                                        initial={{opacity: 0, y: 20}}
                                        animate={{opacity: 1, y: 0}}
                                        exit={{opacity: 0, y: -20}}
                                        transition={{duration: 0.3}}>
                                        <span className="kana">{kanaArray.join(' / ')}</span>
                                        <span className="count">{count}</span>
                                    </motion.li>
                                )
                            })}
                        </motion.ul>
                    </AnimatePresence>

                    {history.length > HISTORY_LIMIT && (
                        <ExpandButton onClick={() => setExpanded(!expanded)} className="btn--expand">
                            {expanded ? 'Свернуть' : 'Развернуть'}
                        </ExpandButton>
                    )}
                </div>
            )}
        </div>
    )
})

export default HistoryList
