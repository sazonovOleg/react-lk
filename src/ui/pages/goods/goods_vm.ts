import {store} from "../../../features/common/redux";
import {GoodsPageStateVm} from "./goods_state";

type TGoodsPageVmState = typeof GoodsPageStateVm

export class GoodsPageVm {
    private store() {
        return store
    }

    dispose() {
        this.store().dispatch(goodsPageVmAction(GoodsPageStateVm))
    }
}

export const goodsPageVmReducer = (
    state: TGoodsPageVmState = GoodsPageStateVm,
    action: TAction,
) => {
    return {...action.state, state: action.state};
};

type TAction = {
    type: "set_goods_page_state",
    state: TGoodsPageVmState,
}

const goodsPageVmAction = (state: TGoodsPageVmState): TAction => ({
    type: 'set_goods_page_state',
    state: state,
});

export type GoodsPageVmInterface = {
    vm: GoodsPageVm
}