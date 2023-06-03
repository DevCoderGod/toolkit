export const repositories = (name:string, amount:number) => ({
	query:`query($name:String!){
		search(query:$name,type:REPOSITORY,first:${amount}) {
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