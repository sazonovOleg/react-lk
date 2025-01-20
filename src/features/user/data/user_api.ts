import {$authHost} from "../../common/axios";

export const userApi = {
    async getUserData() {
        return await $authHost.get('/api/goods/')
    },
}