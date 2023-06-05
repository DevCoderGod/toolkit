import { observer } from 'mobx-react-lite'
import S from './App.module.scss'
import cn from 'classnames'
import { Header } from './components/Header/Header'
import { MainPage } from './pages/MainPage/MainPage'
import { RepositoryPage } from './pages/RepositoryPage/RepositoryPage'
import { Store } from './Store/store'

export const App = observer(function App(){
	return (
		<div className={cn(S.app)}>
			<Header/>
			{
				Store.repo
				? <RepositoryPage repo={Store.repo}/>
				: <MainPage/>
			}
		</div>
	)
})

export default App