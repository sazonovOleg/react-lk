import {store} from "../../../features/common/redux";
import {BehaviorSubject} from "rxjs";
import {RecoveryPassState} from "./recovery_pass_state";
import { AuthService } from "../../../features/auth/domain/auth_service";

export type TRecoveryPassVmState = typeof RecoveryPassState

export type RecoveryPassVmType = {
    vm: RecoveryPassVm,
    state: TRecoveryPassVmState
}

export class RecoveryPassVm {
    private userLogin = ''
    private isLogin = false
    private authService: AuthService
    private store = () => store

    constructor() {
        this.authService = new AuthService()
    }

    changeStateNotifier = new BehaviorSubject<TRecoveryPassVmState>(RecoveryPassState)

    state(): TRecoveryPassVmState {
        return this.store().getState().recoveryPassVmReducer
    }

    initState() {
        this.setState(RecoveryPassState)
    }

    setState(state: TRecoveryPassVmState) {
        this.store().dispatch(recoveryPassAction(state))
        this.changeStateNotifier.next(state)
    }

    setUserName(name: string) {
        this.userLogin = name

        this.isLogin = this.userLogin.length > 3

        this.checkRegBtn()
    }

    checkRegBtn() {
        if (this.isLogin) {
            this.setState({...this.state(), isShowBtn: false})
        } else {
            this.setState({...this.state(), isShowBtn: true})
        }
    }

    async recoveryPass() {
        if (this.isLogin) {
            this.setState({...this.state(), isLoading: true, isDisabled: true})

            await this.authService.recoveryPass(this.userLogin).then((value) => {
                if (value.length > 1) {
                    this.setState({...this.state(), password: value, isLoading: false})
                }
            })
        }
    }
}

export const recoveryPassVmReducer = (
    state: TRecoveryPassVmState = RecoveryPassState,
    action: TAction,
) => {
    return {...action.state, state: action.state};
};

type TAction = {
    type: "set_profile_vm_state",
    state: TRecoveryPassVmState,
}

export const recoveryPassAction = (state: TRecoveryPassVmState): TAction => ({
    type: 'set_profile_vm_state',
    state: state,
});