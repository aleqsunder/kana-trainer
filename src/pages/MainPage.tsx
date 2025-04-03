import {observer} from 'mobx-react-lite'
import {useNavigate} from 'react-router-dom'
import SyllableGridTable from '@/components/SyllableGrid/SyllableGridTable'
import KanaStore from '@/stores/KanaStore'
import {InputSystem, ScriptType} from '@/types/kana'
import Select from 'react-select'
import ExpandButton from '@/components/ExpandButton'

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

const MainPage = observer(() => {
    const {script, inputSystem, setScript, setInputSystem} = KanaStore
    const navigate = useNavigate()

    const startPractice = () => {
        navigate('/practice')
    }

    return (
        <div className="main-page">
            <div className="group-selection">
                <label className="group-selection__label">Изучаемый вид письма</label>
                <div className="group-selection__subtext">
                    Для тренировки и игр можно выбрать как конкретный вид письма (хирагана, катакана), так и оба
                    одновременно
                </div>
                <Select id="script-select" className="select-container" classNamePrefix="react-select"
                    options={scriptOptions} defaultValue={scriptOptions.find(opt => opt.value === script)}
                    onChange={option => option && setScript(option.value as ScriptType)}
                    isSearchable={false}
                />
            </div>

            <SyllableGridTable/>

            <div className="group-selection">
                <label className="group-selection__label">Система ввода</label>
                <div className="group-selection__subtext">
                    Выберите систему транслитерации каны: латиницей, кириллицей или оба варианта одновременно
                </div>
                <Select id="input-select" className="select-container" classNamePrefix="react-select"
	                options={inputSystemOptions}
	                defaultValue={inputSystemOptions.find(opt => opt.value === inputSystem)}
	                onChange={option => option && setInputSystem(option.value as InputSystem)}
	                isSearchable={false}
                />
            </div>

            <div className="group-selection">
                <label className="group-selection__label">Выбор режима</label>
                <div className="group-selection__subtext">
                    Режим запоминания кан путём их ввода на выбранной системе транслитерации
                </div>
            </div>

            <ExpandButton onClick={startPractice}>Тренировка знания кан</ExpandButton>
        </div>
    )
})

export default MainPage
