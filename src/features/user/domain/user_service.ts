import {UserModelType} from "../models/user_model";
import {userRepo} from "../data/user_repo";

export const userService = {
    async getGoods() {
        const user: UserModelType = await userRepo.getUserData()

        return user
    },
}