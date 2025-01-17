import {authApi} from "../data/auth_api";
import {BehaviorSubject} from "rxjs";

export const isAuthBehaviorSubject = new BehaviorSubject<boolean>(false)

export const authService = {
    authKey: 'auth_key',

    async login(userLogin: string, userPassword: string) {
        const isLogin = await authApi.login(userLogin, userPassword)

        if (userLogin.length > 3 && userPassword.length >= 6) {
            this.saveAuthState(isLogin)
        } else {
            this.saveAuthState(false)
        }
    },

    async isRegistration(userLogin: string, userPassword: string) {
        const res = await authApi.registration(userLogin, userPassword)
        const token: string = res.token

        if (token != undefined && token.length) {
            this.saveAuthState(true)

            return true
        } else {
            return false
        }
    },

    saveAuthState(value: boolean) {
        localStorage.setItem(this.authKey, value.toString())

        isAuthBehaviorSubject.next(value)
    },

    getAuthState() {
        const storageItem = localStorage.getItem(this.authKey) ?? 'false'

        if (storageItem != 'false') {
            this.saveAuthState(true)
        } else {
            this.saveAuthState(false)
        }
    },
};