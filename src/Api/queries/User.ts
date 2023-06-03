export const userRepositories = (login:string, amount = 10) => ({
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

export const currentUserRepositories = (amount = 10) => ({
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