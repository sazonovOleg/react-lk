import {GoodsModelsType} from "../../../features/goods/models/goods_model";

type TGoodsPageStateVm = {
    isLoading: boolean,
    goods: GoodsModelsType[]
}

export const GoodsPageStateVm: TGoodsPageStateVm = {
    isLoading: false,
    goods: [],
}