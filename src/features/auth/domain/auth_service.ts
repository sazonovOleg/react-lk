import {authApi} from "../data/auth_api";

export const authService = {
    login(userLogin: string, userPassword: string) {
        authApi.login(userLogin, userPassword)
    },

    registration(userLogin: string, userEmail: string,userPassword: string) {
        authApi.registration(userLogin, userEmail, userPassword)
    }
};