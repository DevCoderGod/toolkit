import React, { useEffect, useRef, useState } from 'react'
import S from './Header.module.scss'
import cn from 'classnames'

export const Header = () => {
	return(
		<div className={cn(S.header)}>
			<h2>ToolKit</h2>
			<label htmlFor='token'>Токен:</label>
			<input id='token'/>
		</div>
	)
}