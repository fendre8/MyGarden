import axios from 'axios';
import { ErrorModel } from '../../Models/common/ErrorModel';
import { Session, UserStatus, UserType } from '../../Models/User/Session';
import User from '../../Models/User/User';
import { LoginRequest, RegisterRequest } from '../../Models/User/UserRequests';
import { baseUrl } from '../SettingsLoader';

export interface AuthenticateResult {
    user: User;
    token: string;
}

export async function getCurrentUser(): Promise<Session> {
    const response = await JSON.parse(localStorage.getItem("session")!) as Session;
    return response;
}

export async function login(data: LoginRequest): Promise<Session> {
    return await axios
        .post<Session>(baseUrl + "auth/login", data)
        .then(response => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + response.data.token;

            const data = new Session();
            data.status = UserStatus.LoggedIn;
            data.succes = true;
            data.token = response.data.token;
            data.userType = UserType.User;
            data.user = response.data.user;
            return data;
        })
        .catch(error => {
            let errorModel: ErrorModel;
            if (error.response === undefined)
                errorModel = {
                    type: "Login",
                    code: "Unable to login!",
                    description: "Can't connect to server."
                };
            else
                errorModel = {
                    type: "Login",
                    code: "Unable to login!",
                    description: error.response.data.message
                };
            let session = new Session();
            session.error = errorModel;
            return session;
        })
}

export async function register(data: RegisterRequest): Promise<ErrorModel | undefined> {
    var url = baseUrl + "auth/register";
    return await axios
        .post<ErrorModel>(url, data)
        .then(response => {
            return undefined;
        })
        .catch(error => {
            if (error.response === undefined)
                return {
                    type: "Register",
                    code: "Unable to register!",
                    description: "Can't connect to server."
                };
            else
                return {
                    type: "Register",
                    code: "Unable to register!",
                    description: error.response.data
                };
        });
};

const exported = {
    login,
    register,
    getCurrentUser
};

export default exported;