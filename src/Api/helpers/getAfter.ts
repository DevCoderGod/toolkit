export const getAfter = (after:string | undefined) => 
	after
		? `,after:"${after}"`
		: ""