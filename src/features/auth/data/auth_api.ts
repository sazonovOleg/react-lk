import {$authHost} from "../../common/axios";

export const authApi = {
    async login(name: string, password: string) {
        const res = await $authHost.post('/api/auth/login', {name, password})

        return res.status == 200;
    },

    async registration(name: string, password: string) {
        const res = await $authHost.post('/api/auth/registration', {name, password})

        return res.data
    }
}