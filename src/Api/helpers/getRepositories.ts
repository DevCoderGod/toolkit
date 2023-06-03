export const getRepositories = (data:any) => {  // TODO typing
	return data.edges
	.map((edge:any) => ({
		id:edge.node.id,
		name:edge.node.name,
		stars: edge.node.stargazerCount,
		last_commit: edge.node.updatedAt,
		ownerName: edge.node.owner.login,
		link: edge.node.owner.url
	})) ?? []
}