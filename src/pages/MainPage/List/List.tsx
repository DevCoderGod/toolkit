import S from './List.module.scss'
import cn from 'classnames'
import { Item } from './Item'
import { Store } from '../../../Store/store'
import { observer } from 'mobx-react-lite'

export const List = observer(function List(){
	return(
		<div className={cn(S.list)}>
			{Store.reporitories.map(repo => <Item key= {repo.id} repo={repo}/>)}
		</div>
	)
})