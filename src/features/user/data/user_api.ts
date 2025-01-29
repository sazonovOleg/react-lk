import {$authHost} from "../../common/axios";
import {AxiosResponse} from "axios";

export class UserApi {
    async getUserData(): Promise<AxiosResponse> {
        return await $authHost.get('/api/user/')
    }
}