import {UserApi} from "./user_api";
import {UserModelType} from "../models/user_model";

export class UserRepo {
    private userApi: UserApi

    constructor() {
        this.userApi = new UserApi()
    }

    async getUserData() {
        const res = await this.userApi.getUserData()

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