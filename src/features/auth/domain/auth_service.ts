import {AuthApi} from "../data/auth_api";
import {BehaviorSubject} from "rxjs";

export const isAuthBehaviorSubject = new BehaviorSubject<boolean>(false)

export class AuthService {
    private authKey: string
    private authApi: AuthApi

    constructor() {
        this.authKey = 'auth_key'
        this.authApi = new AuthApi()
    }

    async login(userLogin: string, userPassword: string) {
        const isLogin = await this.authApi.login(userLogin, userPassword)

        if (userLogin.length > 3 && userPassword.length >= 6) {
            this.saveAuthState(isLogin)
        } else {
            this.saveAuthState(false)
        }
    }

    async isRegistration(userLogin: string, userPassword: string): Promise<boolean> {
        const res = await this.authApi.registration(userLogin, userPassword)
        const token: string = res.token

        if (token != undefined && token.length) {
            this.saveAuthState(true)

            return true
        } else {
            return false
        }
    }

    saveAuthState(value: boolean) {
        localStorage.setItem(this.authKey, value.toString())

        isAuthBehaviorSubject.next(value)
    }

    getAuthStateFromStorage(): boolean {
        const storageItem = localStorage.getItem(this.authKey) ?? 'false'

        return storageItem != 'false'
    }

    getAuthState() {
        const isStorageItem = this.getAuthStateFromStorage()

        this.saveAuthState(isStorageItem)
    }

    async recoveryPass(name: string): Promise<string> {
        const res = await this.authApi.recoveryPass(name)

        if (res.status == 200) {
            return res.data['password']
        } else {
            return ''
        }
    }
}