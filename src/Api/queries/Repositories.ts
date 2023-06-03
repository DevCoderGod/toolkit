export const repositories = (name:string, amount = 10) => ({
	query:`query($name:String!){
		search(query:$name,type:REPOSITORY,first:10) {
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
	}`,
	variables: {name}
})