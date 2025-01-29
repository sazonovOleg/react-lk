import {store} from "../../../features/common/redux";
import {MainPageVmState} from "./main_state";
import {AuthService, isAuthBehaviorSubject} from "../../../features/auth/domain/auth_service";
import {BehaviorSubject} from "rxjs";

export type TMainPageVmState = typeof MainPageVmState

export class MainPageVm {
    private authService: AuthService
    private store = () => store

    constructor() {
        this.authService = new AuthService()
    }

    changeStateNotifier = new BehaviorSubject<TMainPageVmState>(MainPageVmState)

    state(): TMainPageVmState {
        return this.store().getState().mainPageVmReducer
    }

    initState() {
        this.setState(MainPageVmState)
        this.isAuthSubscription()
        this.initAuth()
    }

    setState(state: TMainPageVmState) {
        this.store().dispatch(mainPageVmAction(state))
        this.changeStateNotifier.next(state)
    }

    isAuthSubscription() {
        isAuthBehaviorSubject.subscribe((value) => {
            this.setState({...this.state(), isLogin: value})
        })
    }

    initAuth() {
        this.authService.getAuthState()
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

export const mainPageVmAction = (state: TMainPageVmState): TAction => ({
    type: 'set_main_vm_state',
    state: state,
});