import {store} from "../../../features/common/redux";
import {BehaviorSubject} from "rxjs";
import {AppbarVmState} from "./appbar_state";
import {AuthService} from "../../../features/auth/domain/auth_service";

export type TAppbarVmState = typeof AppbarVmState

export type AppbarVmType = {
    vm: AppbarVm,
    state: TAppbarVmState
}

export class AppbarVm {
    private authService: AuthService
    private store = () => store

    constructor() {
        this.authService = new AuthService()
    }

    changeStateNotifier = new BehaviorSubject<TAppbarVmState>(AppbarVmState)

    state(): TAppbarVmState {
        return this.store().getState().appbarReducer
    }

    initState() {
        this.setState({...AppbarVmState, isLogin: this.isLogin()})
    }

    setState(state: TAppbarVmState) {
        this.store().dispatch(appbarVmAction(state))
        this.changeStateNotifier.next(state)
    }

    showMenu = () => () => {
        this.setState({...this.state(), isOpenMenu: !this.state().isOpenMenu})
    }

    logout = () => () => {
        this.authService.saveAuthState(false)
    }

    isLogin(): boolean {
        return this.authService.getAuthStateFromStorage()
    }
}

export const appbarReducer = (
    state: TAppbarVmState = AppbarVmState,
    action: TAction,
) => {
    return {...action.state, state: action.state};
};

type TAction = {
    type: "set_appbar_vm_state",
    state: TAppbarVmState,
}

export const appbarVmAction = (state: TAppbarVmState): TAction => ({
    type: 'set_appbar_vm_state',
    state: state,
});