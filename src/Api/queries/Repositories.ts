import { getAfter } from "../helpers/getAfter"

export const Repository = {

	search: (name:string, amount:number, after?:string) =>
		`query{
			search(query:"${name}",type:REPOSITORY,first:${amount}${getAfter(after)}) {
				repositoryCount
				edges {
					node{
						... on Repository{
							id
							name
							stargazerCount
							updatedAt
							owner {
								login
								url
							}
						}
					}
				}
			}
		}`
	,

	searchPageInfo: (name:string, amount:number) =>
		`query{
			search(query:"${name}",type:REPOSITORY,first:${amount}) {
				repositoryCount
				pageInfo {
					endCursor
				}
			}
		}`
	,
}