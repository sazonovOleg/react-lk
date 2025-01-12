import {authService} from "../../../features/auth/domain/auth_service";
import {store} from "../../../features/common/redux";
import {AuthPageVmState} from "./auth_state";

type TAuthPageVmState = typeof AuthPageVmState

export type AuthPageVMInterface = {
    vm: AuthPageVM
}

export class AuthPageVM {
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

    private state() {
        return this.store().getState().authPageVmReducer
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

    login(navigate?: () => void) {
        if (this.isLogin && this.isPassword) {
            this.authService().login(this.userLogin, this.userPassword)
            this.store().dispatch(AuthPageVmAction({isDisabled: true, isLoading: true}))

            setTimeout(() => {
                this.store().dispatch(AuthPageVmAction({isDisabled: false, isLoading: false}))

                if (navigate != null) {
                    navigate()
                }
            }, 3000)
        } else {
            //showModalError
        }
    }

    dispose() {
        this.store().dispatch(AuthPageVmAction(AuthPageVmState))
    }
}

export const authPageVmReducer = (
    state: TAuthPageVmState = AuthPageVmState,
    action: TAction,
) => {
    return {...action.state, state: action.state};
};

type TAction = {
    type: "set_auth_vm_state",
    state: TAuthPageVmState,
}

const AuthPageVmAction = (state: TAuthPageVmState): TAction => ({
    type: "set_auth_vm_state",
    state: state,
});