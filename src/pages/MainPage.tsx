import {observer} from 'mobx-react-lite'
import {useNavigate} from 'react-router-dom'
import KanaGridTable from '@/components/KanaGrid/KanaGridTable'
import KanaStore from '@/stores/KanaStore'
import {InputSystem, RandomType, ScriptType} from '@/types/kana'
import Select from 'react-select'
import React from 'react'
import {motion} from 'framer-motion'

const scriptOptions = [
    {value: 'hiragana', label: 'Хирагана'},
    {value: 'katakana', label: 'Катакана'},
    {value: 'both', label: 'Оба варианта'}
]

const inputSystemOptions = [
    {value: 'romaji', label: 'Латиница'},
    {value: 'cyrillic', label: 'Кириллица'},
    {value: 'both', label: 'Оба варианта'}
]

const randomTypeOptions = [
    {value: 'rarest', label: 'Сначала редкие'},
    {value: 'default', label: 'Случайный'},
]

const widgetProps = {
    whileHover: {y: -5},
}

const MainPage = observer(() => {
    const navigate = useNavigate()

    return (
        <div className="main-page">
            <div className="main-page__header">
                <span className="group-selection__caption">Главная страница</span>
            </div>

            <div className="group-selection">
                <label className="group-selection__label">Изучаемый вид письма</label>
                <div className="group-selection__subtext">
                    Для тренировки и игр можно выбрать как конкретный вид письма (хирагана, катакана), так и оба
                    одновременно
                </div>
                <Select id="script-select" className="select-container" classNamePrefix="react-select" options={scriptOptions}
                    defaultValue={scriptOptions.find(opt => opt.value === KanaStore.script)}
                    onChange={option => option && KanaStore.setScript(option.value as ScriptType)}
                    isSearchable={false}
                />
            </div>

            <KanaGridTable/>

            <div className="group-selection">
                <label className="group-selection__label">Система ввода</label>
                <div className="group-selection__subtext">
                    Система транслитерации каны: латиница, кириллица или оба варианта
                </div>
                <Select id="input-select" className="select-container" classNamePrefix="react-select" options={inputSystemOptions}
                    defaultValue={inputSystemOptions.find(opt => opt.value === KanaStore.inputSystem)}
                    onChange={option => option && KanaStore.setInputSystem(option.value as InputSystem)}
                    isSearchable={false}
                />
            </div>

            <div className="group-selection">
                <label className="group-selection__label">Тип рандома</label>
                <div className="group-selection__subtext">
                    На выбор два типа: сначала редкие (на основе истории введённых слогов) или обычная случайность
                </div>
                <Select id="input-select" className="select-container" classNamePrefix="react-select" options={randomTypeOptions}
                    defaultValue={randomTypeOptions.find(opt => opt.value === KanaStore.randomType)}
                    onChange={option => option && KanaStore.setRandomType(option.value as RandomType)}
                    isSearchable={false}
                />
            </div>

            <div className="mode-selection">
                <motion.div className="mode-card" {...widgetProps} onClick={() => navigate('/practice')}>
                    <div className="mode-card__icon">書</div>
                    <div className="mode-card__content">
                        <h3 className="mode-card__title">Тренировка знания кан</h3>
                        <p className="mode-card__description">
                            Режим запоминания кан путём их ввода на выбранной системе транслитерации
                        </p>
                    </div>
                    <div className="mode-card__arrow">→</div>
                </motion.div>

                <motion.div className="mode-card mode-card--accent" {...widgetProps}
                            onClick={() => navigate('/keyboard-race')}>
                    <div className="mode-card__icon">⚡</div>
                    <div className="mode-card__content">
                        <h3 className="mode-card__title">Клавогонка</h3>
                        <p className="mode-card__description">
                            Режим быстрого ввода сгенерированного массива кан с выдачей статистики
                        </p>
                    </div>
                    <div className="mode-card__arrow">→</div>
                </motion.div>
            </div>
        </div>
    )
})

export default MainPage
