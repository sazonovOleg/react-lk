import {UserModelType} from "../../../features/user/models/user_model";

export type TProfilePageState = {
    isLoading: boolean,
    isLogin: boolean,
    user: UserModelType,
}

export const ProfilePageVmState: TProfilePageState = {
    isLoading: false,
    isLogin: false,
    user: {
        name: '',
        token: '',
    },
}