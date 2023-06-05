import { observer } from 'mobx-react-lite'
import S from './MainPage.module.scss'
import cn from 'classnames'
import { Search } from './Search/Search'
import { List } from './List/List'
import { Paginator } from './Paginator/Paginator'

export const MainPage = observer(function MainPage(){

	return(
		<div className={cn(S.main)}>
			<Search/>
			<List/>
			<Paginator/>
		</div>
	)
})