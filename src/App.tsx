import {AnimatePresence} from 'framer-motion'
import {useLocation} from 'react-router-dom'
import {AppRoutes} from '@/router/AppRoutes'
import {useNavigationDirection} from '@/hooks/useNavigationDirection'

function App() {
    const location = useLocation()
    const direction = useNavigationDirection()

    return (
        <div className="main-page">
            <AnimatePresence initial={false} custom={direction}>
                <AppRoutes key={location.pathname} direction={direction}/>
            </AnimatePresence>
        </div>
    )
}

export default App
