import {store} from "../../../features/common/redux";
import {GoodsPageStateVm} from "./goods_state";
import {GoodsService} from "../../../features/goods/domain/goods_service";
import {BehaviorSubject} from "rxjs";

export type TGoodsPageVmState = typeof GoodsPageStateVm

export class GoodsPageVm {
    private goodsService: GoodsService
    private store() {
        return store
    }

    constructor() {
        this.goodsService = new GoodsService()
    }

    changeStateNotifier = new BehaviorSubject<TGoodsPageVmState>(this.state())

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
        this.setState({...this.state(), isLoading: true})
        await this.goodsService.getGoods().then((value) => {
            if (value.length != 0) {
                setTimeout(() => {
                    this.setState({...this.state(), isLoading: false, goods: value})
                }, 1000)
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