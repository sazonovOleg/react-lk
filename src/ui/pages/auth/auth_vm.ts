import {authService} from "../../../features/auth/domain/auth_service";
import {store} from "../../../features/common/redux";
import {AuthPageVmState} from "./auth_state";
import {BehaviorSubject} from "rxjs";

export type TAuthPageVmState = typeof AuthPageVmState

export type AuthPageVmType = {
    vm: AuthPageVM,
    state: TAuthPageVmState
}

export class AuthPageVM {
    private userLogin = ''
    private userPassword = ''
    private isLogin = false
    private isPassword = false

    private store() {
        return store
    }

    changeStateNotifier = new BehaviorSubject<TAuthPageVmState>(AuthPageVmState)

    state(): TAuthPageVmState {
        return this.store().getState().authPageVmReducer
    }

    initState() {
        this.setState(AuthPageVmState)
    }

    setUserName(name: string) {
        this.userLogin = name

        if (this.userLogin.length > 3) {
            this.isLogin = true
        }
    }

    setPasswordName(password: string) {
        this.userPassword = password

        if (this.userPassword.length >= 6) {
            this.isPassword = true
        }
    }

    setState(state: TAuthPageVmState) {
        this.store().dispatch(authPageVmAction(state))
        this.changeStateNotifier.next(state)
    }

    async loginOnApi() {
        await authService.login(this.userLogin, this.userPassword)
    }

    async login() {
        if (this.isLogin && this.isPassword) {
            this.setState({...this.state(), isDisabled: true, isLoading: true})

            try {
                await this.loginOnApi()
            } catch (e) {
                console.error(e)
            }
        } else {
            //showModalError
        }
    }

    recoveryPass(navigate?: () => void) {
        if (navigate != null) {
            navigate()
        }
    }
}

export const authPageVmReducer = (
    state: TAuthPageVmState = AuthPageVmState,
    action: TAction,
) => {
    return {...action.state, state: action.state};
};

type TAction = {
    type: "set_state",
    state: TAuthPageVmState,
}

const authPageVmAction = (state: TAuthPageVmState): TAction => ({
    type: "set_state",
    state: state,
});