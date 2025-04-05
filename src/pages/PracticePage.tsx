import {observer} from 'mobx-react-lite'
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import HistoryList from '@/components/HistoryList'
import KanaCarousel from '@/components/KanaGrid/KanaCarousel'
import AnswerInput from '@/components/KanaGrid/AnswerInput'
import ExpandButton from '@/components/ExpandButton'
import KanaStore from '@/stores/KanaStore'
import {KanaEntry} from '@/types/kana'
import KanaService from '@/services/KanaService'

const PracticePage = observer(() => {
    const [showHelper, setShowHelper] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const [currentKana, setCurrentKana] = useState<KanaEntry|null>()
    const [previousKanaList, setPreviousKanaList] = useState<KanaEntry[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        setCurrentKana(KanaService.generateRandomKanaExtendType())
    }, [])

    useEffect(() => {
        if (!currentKana || inputValue.length === 0) {
            return
        }

        const lastChar: string = [...inputValue].pop() as string
        if (lastChar === ' ') {
            setShowHelper(true)
            setInputValue(inputValue.trim())
            return
        }

        if (KanaService.checkAnswer(currentKana, inputValue)) {
            setShowHelper(false)
            setPreviousKanaList([currentKana, ...previousKanaList].slice(0, 2))
            KanaStore.updateHistory(currentKana)

            setInputValue('')
            setCurrentKana(KanaService.generateRandomKanaExtendType())
        }
    }, [inputValue])

    return (
        <div className="practice-page">
            <div className="main-page__header">
                <ExpandButton onClick={() => navigate(-1)}>← Назад</ExpandButton>
                <span className="group-selection__caption">Тренировка знания кан</span>
            </div>

            <label className="group-selection__label">Описание тренажёра</label>
            <div className="group-selection__subtext">
                Вы можете писать сколько угодно кан в зависимости от того, как настроили их на <b>предыдущей</b> странице<br/>
                Если вы забыли, как пишется данная кана - нажмите <b>пробел</b>, чтобы получить подсказку на выбранной
                вами системе ввода
            </div>

            {currentKana && (
                <div className="practice-container">
                    <motion.div className="practice__main-content" initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}} transition={{duration: 0.2}}>
                        <KanaCarousel
                            showHelper={showHelper}
                            kana={currentKana}
                            previousKanaList={previousKanaList}
                        />
                        <AnswerInput
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                        />
                    </motion.div>
                    <HistoryList/>
                </div>
            )}
        </div>
    )
})

export default PracticePage
