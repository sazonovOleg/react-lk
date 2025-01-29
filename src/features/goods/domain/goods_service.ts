import {GoodsRepo} from "../data/goods_repo";
import {GoodsModelsType} from "../models/goods_model";

export class GoodsService {
    private goodsRepo: GoodsRepo

    constructor() {
        this.goodsRepo = new GoodsRepo()
    }

    async getGoods() {
        const goods: GoodsModelsType[] = await this.goodsRepo.getGoods()

        return goods
    }
}