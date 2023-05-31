import React, { useEffect, useRef, useState } from 'react'
import S from './List.module.scss'
import cn from 'classnames'
import { Item } from './Item'

export const List = () => {

	return(
		<div className={cn(S.list)}>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
		</div>
	)
}