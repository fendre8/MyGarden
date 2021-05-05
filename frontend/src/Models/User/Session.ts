import { ErrorModel } from "../common/ErrorModel";
import User from "./User";


export enum UserStatus {
    New,
    Registered,
    LoggedIn
}

export enum UserType {
    User,
    Admin
}

export class Session {
    status: UserStatus = UserStatus.New;
    userType: UserType = UserType.User;
    user: User = new User();
    succes: boolean = false;
    token: string = "";
    error?: ErrorModel;
}