import React, { useEffect, useRef, useState } from 'react'
import S from './List.module.scss'
import cn from 'classnames'
import { TListRepository } from '../../../types/Repository'
import { Store } from '../../../Store/store'

interface IProps{
	repo:TListRepository
}

export const Item = (props:IProps) => {
	return(
		<div
			className={cn(S.item)}
			onClick={() =>Store.setRepo({name: props.repo.name, ownerName: props.repo.ownerName})}
		>
			<span className={cn(S.field, S.name)}>{props.repo.name}</span>
			<span className={cn(S.field, S.stars)}>{props.repo.stars}</span>
			<span className={cn(S.field, S.date)}>{props.repo.last_commit}</span>
			<span
				className={cn(S.field, S.link)}
				onClick={e => e.stopPropagation()}
			>
				<a
					href={props.repo.link}
					target='blank'
				>
					{props.repo.link}
				</a>
			</span>
		</div>
	)
}