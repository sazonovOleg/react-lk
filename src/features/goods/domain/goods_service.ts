import {goodsRepo} from "../data/goods_repo";
import {GoodsModelsType} from "../models/goods_model";

export const goodsService = {
    async getGoods() {
        const goods: GoodsModelsType[] = await goodsRepo.getGoods()

        return goods
    },
}