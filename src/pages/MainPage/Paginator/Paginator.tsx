import React, { useEffect, useRef, useState } from 'react'
import S from './Paginator.module.scss'
import cn from 'classnames'
import { Pag } from './Pag'

const pages = [1,2,3,4,5,6,7,8,9,10]

export const Paginator = () => {
	return(
		<div className={cn(S.paginator)}>
			{pages.map(d=><Pag key={d} num={d}/>)}
		</div>
	)
}