import {motion} from 'framer-motion'
import React from 'react'

interface ExpandButtonProps {
	onClick: React.MouseEventHandler<HTMLButtonElement>
	className?: string
	children: React.ReactNode
}

const ExpandButton = ({onClick, className = '', children}: ExpandButtonProps) => {
	return (
		<motion.button className={`btn ${className}`} onClick={onClick}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}>
			{children}
		</motion.button>
	)
}

export default ExpandButton
