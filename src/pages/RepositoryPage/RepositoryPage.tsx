import React, { useEffect, useRef, useState } from 'react'
import S from './RepositoryPage.module.scss'
import cn from 'classnames'
import { IRepository } from '../../types/Repository'

interface IProps{
	repo: IRepository
}

export const RepositoryPage = (props:IProps) => {
	return(
		<div className={cn(S.repo)}>
			<div className={cn(S.header)}>
				<div className={cn(S.name)}>Имя репозитория: {props.repo.name}</div>
				<div className={cn(S.commit)}>Дата обновления: {props.repo.last_commit}</div>
				<div className={cn(S.stars)}>Звёзды: {props.repo.stars}</div>
			</div>
			<div className={cn(S.info)}>
				<div className={cn(S.owner)}>
					<div className={cn(S.avatar)}>
						<img src={props.repo.avatar} alt="avatar" />
						<div className={cn(S.ownerName)}>{props.repo.ownerName}</div>
					</div>
				</div>
				<div className={cn(S.description)}>{props.repo.description}</div>
				<div className={cn(S.languages)}>{props.repo.languages.map(l =><span key={l}>{l}</span>)}</div>
			</div>
		</div>
	)
}