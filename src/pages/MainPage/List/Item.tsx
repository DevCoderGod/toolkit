import React, { useEffect, useRef, useState } from 'react'
import S from './List.module.scss'
import cn from 'classnames'

export const Item = () => {
	return(
		<div className={cn(S.item)}>
			<span className={cn(S.field, S.name)}>Name</span>
			<span className={cn(S.field, S.stars)}>stars</span>
			<span className={cn(S.field, S.date)}>date</span>
			<span className={cn(S.field, S.link)}>link</span>
		</div>
	)
}