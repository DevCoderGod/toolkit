import { getAfter } from "../helpers/getAfter"

export const User = {

	userRepositories: (login:string, amount:number) =>
		`query{
			user(login:"${login}"){
				repositories(first:${amount}) {
					totalCount
					pageInfo {
						endCursor
						startCursor
						hasNextPage
					}
					edges{
						node {
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
		}`,
	
	currentUserRepositories: (amount:number, after?:string) =>
		`query{
			viewer{
				repositories(first:${amount}${getAfter(after)}){
					totalCount
					pageInfo{
						endCursor
						startCursor
						hasNextPage
					}
					edges{
						node{
							id
							name
							stargazerCount
							updatedAt
							owner{
								login
								url
							}
						}
					}
				}
			}
		}`
	,
	
	currentUserPageInfo: (amount:number) =>
		`query{
			viewer{
				repositories(first:${amount}){
					totalCount
					pageInfo{
						endCursor
					}
				}
			}
		}`
	,
}