import {store} from "../../../features/common/redux";
import {BehaviorSubject} from "rxjs";
import {ProfilePageVmState} from "./profile_state";
import {userService} from "../../../features/user/domain/user_service";

export type TProfilePageVmState = typeof ProfilePageVmState

export type ProfilePageVmType = {
    vm: ProfilePageVm,
    state: TProfilePageVmState
}

export class ProfilePageVm {
    private store = () => store

    changeStateNotifier = new BehaviorSubject<TProfilePageVmState>(ProfilePageVmState)

    state(): TProfilePageVmState {
        return this.store().getState().profilePageVmReducer
    }

    initState() {
        this.setState(ProfilePageVmState)
        this.getUserData()
    }

    setState(state: TProfilePageVmState) {
        this.store().dispatch(profilePageVmAction(state))
        this.changeStateNotifier.next(state)
    }

    async getUserData() {
        const user = await userService.getGoods()
        this.setState({...this.state(), user: user})
    }
}

export const profilePageVmReducer = (
    state: TProfilePageVmState = ProfilePageVmState,
    action: TAction,
) => {
    return {...action.state, state: action.state};
};

type TAction = {
    type: "set_profile_vm_state",
    state: TProfilePageVmState,
}

export const profilePageVmAction = (state: TProfilePageVmState): TAction => ({
    type: 'set_profile_vm_state',
    state: state,
});