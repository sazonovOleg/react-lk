import {authService} from "../../../features/auth/domain/auth_service";
import {store} from "../../../features/common/redux";
import {RegistrationPageVmState} from "./registration_state";
import {BehaviorSubject} from "rxjs";

export type TRegistrationPageVmState = typeof RegistrationPageVmState

export type RegistrationPageVmType = {
    vm: RegistrationPageVm,
    state: TRegistrationPageVmState,
}

export class RegistrationPageVm {
    private userLogin = ''
    private userPassword = ''
    private isLogin = false
    private isPassword = false

    private store() {
        return store
    }

    private authService() {
        return authService
    }

    changeStateNotifier = new BehaviorSubject<TRegistrationPageVmState>(RegistrationPageVmState)

    state() {
        return this.store().getState().registrationPageVmReducer
    }

    initState() {
        this.setState(RegistrationPageVmState)
    }

    setState(state: TRegistrationPageVmState) {
        this.store().dispatch(registrationPageVmAction(state))
        this.changeStateNotifier.next(state)
    }

    async registration(navigate?: () => void) {
        if (this.isLogin && this.isPassword) {
            this.setState({...this.state(), isLoading: true, isDisabled: true})
            const isRegistration = await this.authService().isRegistration(this.userLogin, this.userPassword)

            if (isRegistration && navigate != null) {
                navigate()
            }
        }
    }

    setUserName(name: string) {
        this.userLogin = name

        this.isLogin = this.userLogin.length > 3

        this.checkRegBtn()
    }

    setPasswordName(password: string) {
        this.userPassword = password

        this.isPassword = this.userPassword.length >= 6

        this.checkRegBtn()
    }

    checkRegBtn() {
        if (this.isLogin && this.isPassword) {
            this.setState({...this.state(), isShowRegBtn: false})
        } else {
            this.setState({...this.state(), isShowRegBtn: true})
        }
    }

    dispose() {
        this.store().dispatch(registrationPageVmAction(RegistrationPageVmState))
    }
}

export const registrationPageVmReducer = (
    state: TRegistrationPageVmState = RegistrationPageVmState,
    action: TAction,
) => {
    return {...action.state, state: action.state};
};

type TAction = {
    type: "set_registration_vm_state",
    state: TRegistrationPageVmState,
}

const registrationPageVmAction = (state: TRegistrationPageVmState): TAction => ({
    type: "set_registration_vm_state",
    state: state,
});