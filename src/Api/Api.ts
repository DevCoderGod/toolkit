import { IRepository, TListRepository } from '../types/Repository'
import { getRepositories } from './helpers/getRepositories'
import { queries } from './queries'

const gqlQuery = async(token:string, query:string) => fetch("https://api.github.com/graphql",{
	method:"POST",
	headers:{
		'content-type': 'application/json',
		'Authorization': `Bearer ${token}`
	},
	body: JSON.stringify({query:query})
})
	.then(async (res) => {
		if(res.status === 200) return res.json()
		console.log(" api.github.com/graphql Error: ",await res.json())
	})
	// .then(d => {console.log("data === ",d); return d})
	.catch((err:any) => console.log(" api.github.com/graphql connection Error: ",err)) // TODO Error handler

export const api = { // TODO api to class Api{constructor(token:string)}

	userRepositories: async(token:string, login:string, amount:number):Promise<TListRepository[]> => {
		return await gqlQuery(token, queries.User.userRepositories(login, amount))
			.then(d => getRepositories(d.data.user.repositories))
	},

	currentUserRepositories: async(token:string, amount:number, after?:string):Promise<{
		repositoryCount:number
		repositories:TListRepository[]
	}> => {
		return await gqlQuery(token, queries.User.currentUserRepositories(amount, after))
			.then(d => ({
				repositoryCount: d.data.viewer.repositories.totalCount,
				repositories: getRepositories(d.data.viewer.repositories)
			}))
	},

	currentUserRepositoriesInfo: async(token:string, amount:number):Promise<{
		repositoryCount:number
		cursor:string
	}> => {
		return await gqlQuery(token, queries.User.currentUserPageInfo(amount))
			.then(d => ({
				repositoryCount: d.data.viewer.repositories.totalCount,
				cursor: d.data.viewer.repositories.pageInfo.endCursor
			}))
	},

	repositories: async(token:string, name:string, amount:number, after?:string):Promise<{
		repositoryCount:number
		repositories:TListRepository[]
	}> => {
		return await gqlQuery(token, queries.Repository.search(name, amount, after))
			.then(d => ({
				repositoryCount: d.data.search.repositoryCount,
				repositories: getRepositories(d.data.search)
			}))
	},

	repositoriesInfo: async(token:string, name:string, amount:number):Promise<{
		repositoryCount:number
		cursor:string
	}> => {
		return await gqlQuery(token, queries.Repository.searchPageInfo(name, amount))
			.then(d => ({
				repositoryCount: d.data.search.repositoryCount,
				cursor: d.data.search.pageInfo.endCursor
			}))
	},

	repository: async(token:string, name:string, ownerName:string):Promise<IRepository> => {
		return await gqlQuery(token, queries.Repository.repo(name,ownerName))
			.then(d => d.data.repository)
			.then(d => ({
				id: d.id,
				name: d.name,
				stars: d.stargazerCount,
				last_commit: d.updatedAt,
				avatar: d.owner.avatarUrl,
				ownerName: d.owner.login,
				link: d.owner.url,
				languages: d.languages.edges.map((e:any) => e.node.name),
				description: d.description ?? "",
			}))
	},
}