import {store} from "../../../features/common/redux";
import {GoodsPageStateVm} from "./goods_state";
import {goodsService} from "../../../features/goods/domain/goods_service";
import {BehaviorSubject} from "rxjs";

export type TGoodsPageVmState = typeof GoodsPageStateVm

export class GoodsPageVm {
    private store() {
        return store
    }

    changeStateNotifier = new BehaviorSubject<TGoodsPageVmState>(this.state())

    private goodsService() {
        return goodsService
    }

    state() {
        return this.store().getState().goodsPageVmReducer
    }

    initState() {
        this.setState(GoodsPageStateVm)
    }

    async componentDidMount() {
        await this.getGoods()
    }

    componentWillUnmount() {
        this.store().dispatch(goodsPageVmAction(GoodsPageStateVm))
    }

    setState(state: TGoodsPageVmState) {
        this.store().dispatch(goodsPageVmAction(state))
        this.changeStateNotifier.next(state)
    }

    async getGoods() {
        await this.goodsService().getGoods().then((value) => {
            if (value.list.length > 1) {
                this.setState({
                    ...this.state(),
                    listString: value.list,
                    isLoading: false,
                    listLength: value.list.length,
                })
            }
        })
    }
}

export const goodsPageVmReducer = (
    state: TGoodsPageVmState = GoodsPageStateVm,
    action: TAction,
) => {
    return {...action.state, state: action.state};
};

type TAction = {
    type: "set_goods_vm_state",
    state: TGoodsPageVmState,
}

const goodsPageVmAction = (state: TGoodsPageVmState): TAction => ({
    type: 'set_goods_vm_state',
    state: state,
});

export type GoodsPageVmType = {
    vm: GoodsPageVm,
    state: TGoodsPageVmState,
}