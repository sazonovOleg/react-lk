import {store} from "../../../features/common/redux";
import {FavoritesPageVmState} from "./favorites_state";

type TFavoritesPageVmState = typeof FavoritesPageVmState

export class FavoritesPageVm {
    private store() {
        return store
    }

    registration() {

    }

    dispose() {
        this.store().dispatch(favoritesPageVmAction(FavoritesPageVmState))
    }
}

export const favoritesPageVmReducer = (
    state: TFavoritesPageVmState = FavoritesPageVmState,
    action: TAction,
) => {
    return {...action.state, state: action.state};
};

type TAction = {
    type: "set_favorites_vm_state",
    state: TFavoritesPageVmState,
}

const favoritesPageVmAction = (state: TFavoritesPageVmState): TAction => ({
    type: 'set_favorites_vm_state',
    state: state,
});

export type FavoritesPageVmInterface = {
    vm: FavoritesPageVm
}