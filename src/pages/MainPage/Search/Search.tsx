import React, { useEffect, useMemo, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import S from './Search.module.scss'
import cn from 'classnames'
import { Store } from '../../../Store/store'
import { debounce } from '../../../helpers/debounce'

export const Search = observer(function Search(){

	const[search, setSearch] = useState(Store.search)
	const memoDebounced = useMemo(() => debounce(Store.setSearch,1000),[])

	const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
		memoDebounced(e.target.value)
	}
	
	return(
		<div className={cn(S.search)}>
			<label htmlFor='searchInput'>Поиск:</label>
			<input
				id='searchInput'
				value={search}
				onChange={e => onChange(e)}
			/>
			<div>{`Всего: ${Store.repositoryCount}`}</div>
		</div>
	)
})