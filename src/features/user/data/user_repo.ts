import {userApi} from "./user_api";
import {UserModelType} from "../models/user_model";


export const userRepo = {
    async getUserData() {
        const res = await userApi.getUserData()
        let user: UserModelType = {
            token: '',
            name: '',
        }

        if (res.status == 200) {
            user = {
                name: res.data.user.name,
                token: res.data.user.token
            }

            return user
        } else {
            return user
        }
    }
}