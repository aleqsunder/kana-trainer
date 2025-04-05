import React, {useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {useNavigate} from 'react-router-dom'
import {KanaKeyboardRaceEntry, KanaKeyboardRaceStatusType} from '@/types/kana'
import KanaService from '@/services/KanaService'
import {motion} from 'framer-motion'
import ExpandButton from '@/components/ExpandButton'
import AnswerInput from '@/components/KanaGrid/AnswerInput'
import HistoryList from '@/components/HistoryList'
import KanaList from '@/components/KeyboardRace/KanaList'
import EndGameWindow from '@/components/KeyboardRace/EndGameWindow'
import KanaStore from '@/stores/KanaStore'

const KANA_LIMIT_IN_ROW = 50

const KeyboardRacePage = observer(() => {
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState<string>('')
    const [currentKanaIndex, setCurrentKanaIndex] = useState<number>(0)
    const [kanaList, setKanaList] = useState<KanaKeyboardRaceEntry[]>(
        () => KanaService.generateListOfKana(KANA_LIMIT_IN_ROW)
    )

    const [timeStart, setTimeStart] = useState<number>(0)
    const [timeEnd, setTimeEnd] = useState<number>(0)

    function setCurrentKanaStatus(status: KanaKeyboardRaceStatusType = 'success') {
        setKanaList(kanaList.map((item, index) => {
            if (index !== currentKanaIndex) {
                return item
            }

            item.status = status
            return item
        }))
    }

    function nextKana() {
        if (currentKanaIndex < kanaList.length) {
            setCurrentKanaIndex(prev => prev + 1)
        }

        setInputValue('')
    }

    useEffect(() => {
        if (!kanaList[currentKanaIndex] || inputValue.length === 0) {
            return
        }

        const currentKana: KanaKeyboardRaceEntry = kanaList[currentKanaIndex]
        const lastChar: string = [...inputValue].pop() as string
        if (lastChar === ' ') {
            setCurrentKanaStatus('error')
            nextKana()
            return
        }

        if (KanaService.checkAnswer(currentKana, inputValue)) {
            setCurrentKanaStatus('success')
            KanaStore.updateHistory(currentKana)
            nextKana()
        }
    }, [inputValue])

    useEffect(() => {
        if (inputValue && !timeStart) {
            setTimeStart(Date.now())
        }
    }, [inputValue, timeStart])

    useEffect(() => {
        if (currentKanaIndex >= kanaList.length && timeStart) {
            setTimeEnd(Date.now())
        }
    }, [currentKanaIndex, kanaList.length, timeStart])


    return (
        <div className="practice-page">
            <div className="main-page__header">
                <ExpandButton onClick={() => navigate(-1)}>← Назад</ExpandButton>
                <span className="group-selection__caption">Клавогонка</span>
            </div>

            <label className="group-selection__label">Описание тренажёра</label>
            <div className="group-selection__subtext">
                Перед вами появляется случайно сгенерированный список из кан в зависимости от настроек<br/>
                Вы должны написать транскрипцию текущей каны, что отображается на странице<br/>
                Если вы забыли, как пишется данная кана - нажмите <b>пробел</b>, чтобы пропустить её
            </div>

            {kanaList.length > 0 && (
                <div className="practice-container">
                    <motion.div className="practice__main-content" initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}} transition={{duration: 0.2}}>
                        {currentKanaIndex < kanaList.length
                            ? <KanaList currentKanaIndex={currentKanaIndex} kanaList={kanaList}/>
                            : <EndGameWindow kanaList={kanaList} timeStart={timeStart} timeEnd={timeEnd}/>
                        }
                        {currentKanaIndex < kanaList.length &&
                            <AnswerInput
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                            />
                        }
                    </motion.div>
                    <HistoryList/>
                </div>
            )}
        </div>
    )
})

export default KeyboardRacePage
