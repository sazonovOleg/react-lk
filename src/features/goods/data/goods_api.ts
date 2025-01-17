import {$authHost} from "../../common/axios";

export const goodsApi = {
    async getGoods() {
        const res = await $authHost.get('/api/goods/')

        return res.data;
    },
}