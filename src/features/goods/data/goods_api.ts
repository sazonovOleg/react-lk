import {$authHost} from "../../common/axios";

export const goodsApi = {
    async getGoods() {
        return await $authHost.get('/api/goods/')
    },
}