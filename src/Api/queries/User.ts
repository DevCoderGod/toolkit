export const userRepositories = (login:string, amount:number) => ({
	query:`query($log:String!) {
		user(login:$log){
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
	variables: {log: login}
})

export const currentUserRepositories = (amount:number) => ({
	query:`query{
		viewer{
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
})