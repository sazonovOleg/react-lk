import {$authHost} from "../../common/axios";

export class GoodsApi {
    async getGoods() {
        return await $authHost.get('/api/goods/')
    }
}