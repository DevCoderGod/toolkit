import { TListRepository } from '../types/Repository'
import { getRepositories } from './helpers/getRepositories'
import { queries } from './queries'

const gqlQuery = async(token:string, query:object) => fetch("https://api.github.com/graphql",{
	method:"POST",
	headers:{
		'content-type': 'application/json',
		'Authorization': `Bearer ${token}`
	},
	body: JSON.stringify(query)
})
	.then(async (res) => {
		if(res.status === 200) return res.json()
		console.log(" api.github.com/graphql Error: ",await res.json())
	})
	.then(d=>{ // TODO delete console.log
		console.log("d === ",d)
		return d
	})
	.catch((err:any) => console.log(" api.github.com/graphql connection Error: ",err))

export const api = { // TODO api to class Api{constructor(token:string)}

	userRepositories: async(token:string, login:string):Promise<TListRepository[]> => {
		return await gqlQuery(token, queries.userRepositories(login))
			.then(d => getRepositories(d.data.user.repositories))
	},

	currentUserRepositories: async(token:string):Promise<TListRepository[]> => {
		return await gqlQuery(token, queries.currentUserRepositories())
			.then(d => getRepositories(d.data.viewer.repositories))
	},

	repositories: async(token:string,name:string):Promise<TListRepository[]> => {
		return await gqlQuery(token, queries.repositories(name))
			.then(d => getRepositories(d.data.search))
	},
}