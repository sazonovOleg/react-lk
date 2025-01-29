import {$authHost} from "../../common/axios";
import {AxiosResponse} from "axios";

export class AuthApi {
    async login(name: string, password: string): Promise<boolean> {
        const res = await $authHost.post('/api/auth/login', {name, password})

        return res.status == 200;
    }

    async registration(name: string, password: string): Promise<any> {
        const res = await $authHost.post('/api/auth/registration', {name, password})

        return res.data
    }

    async recoveryPass(name: string): Promise<AxiosResponse> {
        return await $authHost.post('/api/auth/login', {name})
    }
}