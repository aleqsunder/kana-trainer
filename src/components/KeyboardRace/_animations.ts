import {Variants} from 'framer-motion'

export const containerVariants: Variants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: .1,
            delayChildren: 0
        }
    }
}

export const itemVariants: Variants = {
    hidden: {y: 10, opacity: 0},
    visible: {
        y: 0,
        opacity: 1,
        transition: {duration: .15}
    }
}

export const progressVariants: Variants = {
    hidden: {width: 0},
    visible: custom => ({
        width: `${custom}%`,
        transition: {
            duration: .5,
            delay: .8
        }
    })
}
