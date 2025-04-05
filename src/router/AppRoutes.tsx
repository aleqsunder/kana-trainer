import {Route, Routes} from 'react-router-dom'
import {Page} from './Page'
import MainPage from '@/pages/MainPage'
import PracticePage from '@/pages/PracticePage'
import KeyboardRacePage from '@/pages/KeyboardRacePage'

type AppRoutesProps = {
    direction: 'forward' | 'backward'
}

export const AppRoutes = ({direction}: AppRoutesProps) => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Page direction={direction}>
                        <MainPage/>
                    </Page>
                }
            />
            <Route
                path="/practice"
                element={
                    <Page direction={direction}>
                        <PracticePage/>
                    </Page>
                }
            />
            <Route
                path="/keyboard-race"
                element={
                    <Page direction={direction}>
                        <KeyboardRacePage/>
                    </Page>
                }
            />
        </Routes>
    )
}
