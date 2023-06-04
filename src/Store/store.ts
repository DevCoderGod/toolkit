import { makeObservable, observable, action, autorun, reaction } from 'mobx'
import { IRepository, TListRepository } from '../types/Repository'
import { api } from '../Api/Api'

export class CAppStore{
	token: string
	search: string
	amount: number
	pages: number
	currentPage:number
	newPage:boolean
	reporitories: TListRepository[]
	repositoryCount:number
	repo: IRepository | null

	constructor() {
		makeObservable(this, {
			token: observable,
			search: observable,
			amount: observable,
			pages: observable,
			currentPage: observable,
			newPage: observable,
			reporitories: observable,
			repositoryCount: observable,
			repo: observable,
			setToken: action,
			setSearch: action,
			setAmount: action,
			setPages: action,
			setCurrentPage: action,
			setNewPage: action,
			setReporitories: action,
			setRepositoryCount: action,
			setRepo: action,
        })
		this.token = localStorage.getItem("token") ?? ""
		this.search = localStorage.getItem("search") ?? ""
		this.amount = 10
		this.pages = 0
		this.currentPage = parseInt(localStorage.getItem("currentPage") ?? "1")
		this.newPage = false
		this.reporitories = []
		this.repositoryCount = 0
		this.repo = null
	}

	setToken = (t:string) => {
		localStorage.setItem("token",t)
		this.token = t
	}

	setSearch = (s:string) => {
		localStorage.setItem("search",s)
		this.search = s
	}

	setAmount = (a:number) => {
		this.amount = a
	}

	setPages = (p:number) => {
		this.pages = p > 10 ? 10 :p
	}

	setCurrentPage = (p:number) => {
		localStorage.setItem("currentPage",p.toString())
		this.currentPage = p
	}
	
	setNewPage = (n:boolean) => {
		this.newPage = n
	}

	setRepo = async(name:string, ownerName:string) => {
		this.repo = await api.repository(this.token, name, ownerName)
	}

	setReporitories = (rs:TListRepository[]) => {
		this.reporitories = rs
	}

	setRepositoryCount = (c:number) => {
		this.repositoryCount = c
	}
}

export const Store = new CAppStore()

// eslint-disable-next-line
// @ts-ignore
globalThis.Store=Store

autorun(async() => {
	if(Store.token.length===0) return
	const search = localStorage.getItem("search") ?? ""
	const currentPage = parseInt(localStorage.getItem("currentPage") ?? "1")
	if(search.length===0){
		const cursor = await currentUserRepositoriesCursor(currentPage)
		const { repositoryCount, repositories } = await api.currentUserRepositories(Store.token, Store.amount, cursor)
		Store.setPages(repositoryCount / Store.amount)
		Store.setRepositoryCount(repositoryCount)
		Store.setReporitories(repositories)
	} else {
		const cursor = await repositoriesCursor(Store.currentPage)
		const { repositoryCount, repositories } = await api.repositories(Store.token, Store.search, Store.amount, cursor)
		Store.setPages(repositoryCount / Store.amount)
		Store.setRepositoryCount(repositoryCount)
		Store.setReporitories(repositories)
	}
})

reaction(
	() => Store.search,
	async (search) => {
		if(search.length===0){
			const cursor = await currentUserRepositoriesCursor(Store.currentPage)
			const { repositoryCount, repositories } = await api.currentUserRepositories(Store.token, Store.amount, cursor)
			Store.setPages(repositoryCount / Store.amount)
			Store.setCurrentPage(1)
			Store.setRepositoryCount(repositoryCount)
			Store.setReporitories(repositories)
		} else {
			const cursor = await repositoriesCursor(Store.currentPage)
			const { repositoryCount, repositories } = await api.repositories(Store.token, Store.search, Store.amount, cursor)
			Store.setPages(repositoryCount / Store.amount)
			Store.setCurrentPage(1)
			Store.setRepositoryCount(repositoryCount)
			Store.setReporitories(repositories)
		}
	}
)

reaction(
	() => Store.newPage,
	async newPage => {
		if(!newPage) return
		if(Store.search.length===0){
			const cursor = await currentUserRepositoriesCursor(Store.currentPage)
			const { repositories } = await api.currentUserRepositories(Store.token, Store.amount, cursor)
			Store.setReporitories(repositories)
		} else {
			const cursor = await repositoriesCursor(Store.currentPage)
			const { repositories } = await api.repositories(Store.token, Store.search, Store.amount, cursor)
			Store.setReporitories(repositories)
		}
		Store.setNewPage(false)
	}
)

async function currentUserRepositoriesCursor(page:number):Promise<string | undefined>{
	return page !== 1
	? (await api.currentUserRepositoriesInfo(Store.token, Store.amount*(Store.currentPage-1))).cursor
	: undefined
}

async function repositoriesCursor(page:number):Promise<string | undefined>{
	return page !== 1
	? (await api.repositoriesInfo(Store.token, Store.search, Store.amount*(Store.currentPage-1))).cursor
	: undefined
}