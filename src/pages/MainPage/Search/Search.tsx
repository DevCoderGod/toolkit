import React, { useEffect, useRef, useState } from 'react'
import S from './Search.module.scss'
import cn from 'classnames'

export const Search = () => {
	return(
		<div className={cn(S.search)}>
			<label htmlFor='searchInput'>Поиск:</label>
			<input id='searchInput'/>
		</div>
	)
}