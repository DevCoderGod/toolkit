import React, { useEffect, useRef, useState } from 'react'
import S from './List.module.scss'
import cn from 'classnames'
import { TListRepository } from '../../../types/Repository'

interface IProps{
	repo:TListRepository
}

export const Item = (props:IProps) => {
	return(
		<div className={cn(S.item)}>
			<span className={cn(S.field, S.name)}>{props.repo.name}</span>
			<span className={cn(S.field, S.stars)}>{props.repo.stars}</span>
			<span className={cn(S.field, S.date)}>{props.repo.last_commit}</span>
			<span className={cn(S.field, S.link)}>{props.repo.link}</span>
		</div>
	)
}