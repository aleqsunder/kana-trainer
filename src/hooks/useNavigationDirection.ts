import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'

export type Direction = 'forward' | 'backward'

export const useNavigationDirection = () => {
    const [history, setHistory] = useState<string[]>([])
    const location = useLocation()
    const [direction, setDirection] = useState<Direction>('forward')

    useEffect(() => {
        setHistory(prev => {
            const newHistory = [...prev, location.pathname]

            if (newHistory.length > 2) {
                newHistory.shift()
            }

            const direction = newHistory[0] === location.pathname ? 'backward' : 'forward'
            setDirection(direction)

            return newHistory
        })
    }, [location])

    return direction
}
