import { store } from "../../../features/common/redux";
import {RegistrationPageVmState} from "./registration_state";

type TRegistrationPageVmState = typeof RegistrationPageVmState

export type RegistrationPageVmInterface = {
    vm: RegistrationPageVm
}

export class RegistrationPageVm {
    private store() {
        return store
    }

    registration() {

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