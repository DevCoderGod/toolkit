export interface IRepository {
	id:string
	name:string
	stars: number
	last_commit: string
	avatar : string
	ownerName: string
	languages: [string]
	description: string
	link:string
}

export type TListRepository = Pick<IRepository, "id"|"name"|"stars"|"last_commit"|"ownerName"|"link">