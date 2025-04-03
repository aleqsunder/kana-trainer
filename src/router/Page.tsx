import { motion } from 'framer-motion'
import React from 'react'

type Direction = 'forward' | 'backward'

const depthVariants = {
	initial: (direction: Direction) => ({
		rotateY: direction === 'forward' ? 10 : -10,
		opacity: 0,
		filter: 'blur(2px)',
	}),
	in: {
		rotateY: 0,
		opacity: 1,
		filter: 'blur(0px)',
		transition: {duration: 0.25}
	},
	out: (direction: Direction) => ({
		rotateY: direction === 'forward' ? -10 : 10,
		opacity: 0,
		filter: 'blur(6px)',
		transition: {duration: 0.1}
	})
}

type PageProps = {
	children: React.ReactNode
	direction: Direction
}

export const Page = ({ children, direction }: PageProps) => {
	return (
		<motion.div
			custom={direction}
			variants={depthVariants}
			initial="initial"
			animate="in"
			exit="out"
			style={{
				position: 'absolute',
				width: '100%',
				height: '100%',
				top: 0,
				left: 0
			}}
		>
			{children}
		</motion.div>
	)
}
