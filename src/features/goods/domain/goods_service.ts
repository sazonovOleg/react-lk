import {goodsApi} from "../data/goods_api";

export const goodsService = {
    async getGoods() {
        const goods = await goodsApi.getGoods()


        return goods
    },
};