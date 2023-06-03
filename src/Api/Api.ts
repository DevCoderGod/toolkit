import { TListRepository } from '../types/Repository'
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

export const api = {

	userRepositories: async(token:string, login:string):Promise<TListRepository[]> => {
		return await gqlQuery(token, queries.userRepositories(login))
			.then(d => d.data.user.repositories.edges.map((edge:any) => edge.node)) // TODO typing
			.then(d => d.map((node:any) => ({
						id:node.id,
						name:node.name,
						stars: node.stargazerCount,
						last_commit: node.updatedAt,
						ownerName: node.owner.login,
						link: node.owner.url
					})
				)
			)
		?? []
	},
}