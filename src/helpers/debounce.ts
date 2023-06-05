
export function debounce(cb: (...args:any)=>void, wait:number) {
	let timer = 0;
	const debounced = (...args: any[]) => {
		clearTimeout(timer)
		timer = setTimeout(() => cb(...args), wait)
	}
	return debounced
}