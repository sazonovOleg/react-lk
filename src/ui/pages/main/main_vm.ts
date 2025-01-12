import {store} from "../../../features/common/redux";
import {MainPageVmState} from "./main_state";
import {authService} from "../../../features/auth/domain/auth_service";

type TMainPageVmState = typeof MainPageVmState

export class MainPageVm {
    private store() {
        return store
    }

    dispose() {
        this.store().dispatch(mainPageVmAction(MainPageVmState))
    }
}

export const mainPageVmReducer = (
    state: TMainPageVmState = MainPageVmState,
    action: TAction,
) => {
    return {...action.state, state: action.state};
};

type TAction = {
    type: "set_main_vm_state",
    state: TMainPageVmState,
}

const mainPageVmAction = (state: TMainPageVmState): TAction => ({
    type: 'set_main_vm_state',
    state: state,
});

export type MainPageVmInterface = {
    vm: MainPageVm
}