import { makeObservable, observable, action, autorun } from 'mobx'
import { IRepository, TListRepository } from '../types/Repository'
import { api } from '../Api/Api'

export class CAppStore{
	token: string
	search: string
	reporitories: TListRepository[]
	repo: IRepository | null

	constructor() {
		makeObservable(this, {
			token: observable,
			search: observable,
			reporitories: observable,
			repo: observable,
			setToken:action,
			setSearch:action,
			setReporitories:action,
			setRepo:action,
        })
		this.token = localStorage.getItem("token") ?? ""
		this.search = ""
		this.reporitories = []
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

	setRepo = (r:IRepository) => {
		this.repo = r
	}

	setReporitories = (rs:TListRepository[]) => {
		this.reporitories = rs
	}
}

export const Store = new CAppStore()

// eslint-disable-next-line
// @ts-ignore
globalThis.Store=Store

autorun(async() => {
		if(Store.token.length>0)Store.setReporitories(await api.currentUserRepositories(Store.token))
})