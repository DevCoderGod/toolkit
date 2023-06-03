import React, { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import S from './Search.module.scss'
import cn from 'classnames'
import { Store } from '../../../Store/store'

export const Search = observer(function Search(){
	
	const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		Store.setSearch(e.target.value)
	}
	
	return(
		<div className={cn(S.search)}>
			<label htmlFor='searchInput'>Поиск:</label>
			<input
				id='searchInput'
				value={Store.search}
				onChange={e => onChange(e)}
			/>
		</div>
	)
})