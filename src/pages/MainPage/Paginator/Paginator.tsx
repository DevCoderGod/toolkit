import React, { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import S from './Paginator.module.scss'
import cn from 'classnames'
import { Pag } from './Pag'
import { Store } from '../../../Store/store'

export const Paginator = observer(function Paginator(){
	function* getPages(){
		for(let i=0; i<Store.pages;i++) yield i+1
	}

	return(
		<div className={cn(S.paginator)}>
			{[...getPages()].map(n =>
				<Pag
					key={n}
					active={Store.currentPage === n}
					num={n}
					onClick={()=>{
						Store.setCurrentPage(n)
						Store.setNewPage(true)
					}}
				/>)
			}
		</div>
	)
})