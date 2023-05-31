import S from './App.module.scss'
import cn from 'classnames'
import { Header } from './components/Header/Header'
import { MainPage } from './pages/MainPage/MainPage'

export const App = () => {
	return (
		<div className={cn(S.app)}>
			<Header/>
			<MainPage/>
		</div>
	)
}

export default App