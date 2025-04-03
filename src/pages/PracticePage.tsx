import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HistoryList from '@/components/HistoryList'
import KanaStore from '@/stores/KanaStore'
import SyllablesCarousel from '@/components/SyllableGrid/SyllablesCarousel'
import AnswerInput from '@/components/SyllableGrid/AnswerInput'
import { motion } from 'framer-motion'
import ExpandButton from '@/components/ExpandButton'

const PracticePage = observer(() => {
	const navigate = useNavigate()

	useEffect(() => {
		KanaStore.generateNewSyllable()

		const handleKeyUp = () => {
			if (KanaStore.checkAnswer() && KanaStore.currentSyllable) {
				KanaStore.addPreviousSyllable()
				KanaStore.generateNewSyllable()
			}
		}

		window.addEventListener('keyup', handleKeyUp)
		return () => window.removeEventListener('keyup', handleKeyUp)
	}, [])

	return (
		<div className="practice-page">
			<div className="main-page__header">
				<ExpandButton onClick={() => navigate(-1)}>← Назад</ExpandButton>
				<span className="group-selection__label">Тренировка знания кан</span>
			</div>

			<div className="practice-container">
				<motion.div className="practice__main-content" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.2}}>
					<SyllablesCarousel/>
					<AnswerInput
						value={KanaStore.inputValue}
						onChange={(e) => KanaStore.setInputValue(e.target.value)}
					/>
				</motion.div>

				<HistoryList/>
			</div>
		</div>
)
})

export default PracticePage
