import { queries } from './queries'

const gqlQuery = async(token:string, query:object) => fetch("https://api.github.com/graphql",{
	method:"POST",
	headers:{
		'content-type': 'application/json',
		'Authorization': `Bearer ${token}`
	},
	body: JSON.stringify(query)
})
	.then(d=>{
		console.log("d === ",d)
		return d
	})
	.then(async (res) => {
		if(res.status === 200) return res.json()
		console.log(" api.github.com/graphql Error: ",await res.json())
	})

export const api = {

}