import {UserModelType} from "../models/user_model";
import {UserRepo} from "../data/user_repo";

export class UserService {
    private userRepo: UserRepo

    constructor() {
        this.userRepo = new UserRepo()
    }

    async getGoods() {
        const user: UserModelType = await this.userRepo.getUserData()

        return user
    }
}