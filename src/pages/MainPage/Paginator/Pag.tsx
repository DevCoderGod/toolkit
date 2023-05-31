import React, { useEffect, useRef, useState } from 'react'
import S from './Paginator.module.scss'
import cn from 'classnames'

interface IProps{
	num:number
}
export const Pag = (props:IProps) => {
	return(
		<div className={cn(S.pag)}>{props.num}</div>
	)
}