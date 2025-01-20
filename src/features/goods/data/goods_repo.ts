import {goodsApi} from "./goods_api";
import {GoodsModelsType} from "../models/goods_model";

export const goodsRepo = {
    async getGoods() {
        const res = await goodsApi.getGoods()
        const newGoods: GoodsModelsType[] = []

        if (res.status == 200) {
            res.data.goodsModels.map((item: GoodsModelsType) => {
                newGoods.push(item)
            })

            return newGoods
        } else {
            return []
        }
    }
}