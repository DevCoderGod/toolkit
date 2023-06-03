import React, { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import S from './Header.module.scss'
import cn from 'classnames'
import { Store } from '../../Store/store'

export const Header = observer(function Header(){

	const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		Store.setToken(e.target.value)
	}

	return(
		<div className={cn(S.header)}>
			<h2>ToolKit</h2>
			<label htmlFor='token'>Токен:</label>
			<input
				id='token'
				value={Store.token}
				onChange={e => onChange(e)}
			/>
		</div>
	)
})