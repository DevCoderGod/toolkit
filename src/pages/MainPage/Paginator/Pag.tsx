import S from './Paginator.module.scss'
import cn from 'classnames'

interface IProps{
	active:boolean
	num:number
	onClick:()=>void
}
export const Pag = (props:IProps) => {
	return(
		<div
			className={cn(S.pag, props.active ? S.active : "")}
			onClick={props.onClick}
		>
			{props.num}
		</div>
	)
}