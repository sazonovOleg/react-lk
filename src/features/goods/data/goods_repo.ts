import {GoodsApi} from "./goods_api";
import {GoodsModelsType} from "../models/goods_model";

export class GoodsRepo {
    private goodsApi: GoodsApi

    constructor() {
        this.goodsApi = new GoodsApi()
    }

    async getGoods() {
        const res = await this.goodsApi.getGoods()
        const newGoods: GoodsModelsType[] = []

        if (res.status == 200) {
            res.data.goods.map((item: GoodsModelsType) => {
                newGoods.push(item)
            })

            return newGoods
        } else {
            return []
        }
    }
}