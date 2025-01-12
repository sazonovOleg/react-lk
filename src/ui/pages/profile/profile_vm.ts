import { store } from "../../../features/common/redux";
import {ProfilePageStateVm} from "./profile_state";

type TProfilePageVmState = typeof ProfilePageStateVm

export type ProfilePageVmInterface = {
    vm: ProfilePageVm
}

export class ProfilePageVm {
    private store() {
        return store
    }

    registration() {

    }

    dispose() {
        this.store().dispatch(registrationPageVmAction(ProfilePageStateVm))
    }
}

export const profilePageVmReducer = (
    state: TProfilePageVmState = ProfilePageStateVm,
    action: TAction,
) => {
    return {...action.state, state: action.state};
};

type TAction = {
    type: "set_profile_vm_state",
    state: TProfilePageVmState,
}

const registrationPageVmAction = (state: TProfilePageVmState): TAction => ({
    type: "set_profile_vm_state",
    state: state,
});