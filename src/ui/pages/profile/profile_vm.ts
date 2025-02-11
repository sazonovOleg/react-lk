import {store} from "../../../features/common/redux";
import {BehaviorSubject} from "rxjs";
import {ProfilePageVmState} from "./profile_state";
import {UserService} from "../../../features/user/domain/user_service";

export type TProfilePageVmState = typeof ProfilePageVmState

export type ProfilePageVmType = {
    vm: ProfilePageVm,
    state: TProfilePageVmState
}

export class ProfilePageVm {
    private userService: UserService
    private store = () => store

    constructor() {
        this.userService = new UserService()
    }

    changeStateNotifier = new BehaviorSubject<TProfilePageVmState>(ProfilePageVmState)

    state(): TProfilePageVmState {
        return this.store().getState().profilePageVmReducer
    }

    initState() {
        this.setState(ProfilePageVmState)
    }

    async componentDidMount() {
        await this.getUserData()
    }

    setState(state: TProfilePageVmState) {
        this.store().dispatch(profilePageVmAction(state))
        this.changeStateNotifier.next(state)
    }

    async getUserData() {
        const user = await this.userService.getGoods()
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