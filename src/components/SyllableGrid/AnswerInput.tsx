import {motion} from 'framer-motion'
import React from 'react'

interface AnswerInputProps {
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AnswerInput = ({value, onChange}: AnswerInputProps) => (
	<motion.input
		type="text"
		value={value}
		onChange={onChange}
		placeholder="Введите слог"
		className="answer-input"
		whileFocus={{boxShadow: '0 0 0 2px #63b3ed'}}
		autoFocus
	/>
)

export default AnswerInput
