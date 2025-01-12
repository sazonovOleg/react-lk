import {store} from "../../../features/common/redux";
import {CartPageVmState} from "./cart_state";

type TCartPageVmState = typeof CartPageVmState

export class CartPageVm {
    private store() {
        return store
    }

    registration() {

    }

    dispose() {
        this.store().dispatch(cartPageVmAction(CartPageVmState))
    }
}

export const cartPageVmReducer = (
    state: TCartPageVmState = CartPageVmState,
    action: TAction,
) => {
    return {...action.state, state: action.state};
};

type TAction = {
    type: "set_cart_vm_state",
    state: TCartPageVmState,
}

const cartPageVmAction = (state: TCartPageVmState): TAction => ({
    type: 'set_cart_vm_state',
    state: state,
});

export type CartPageVmInterface = {
    vm: CartPageVm
}