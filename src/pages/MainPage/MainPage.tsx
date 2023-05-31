import React, { useEffect, useRef, useState } from 'react'
import S from './MainPage.module.scss'
import cn from 'classnames'
import { Search } from './Search/Search'
import { List } from './List/List'
import { Paginator } from './Paginator/Paginator'

export const MainPage = () => {
	return(
		<div className={cn(S.main)}>
			<Search/>
			<List/>
			<Paginator/>
		</div>
	)
}