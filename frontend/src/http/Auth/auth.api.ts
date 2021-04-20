import axios, {AxiosRequestConfig} from 'axios';
import { ErrorModel } from '../../Models/common/ErrorModel';
import { Session } from '../../Models/User/Session';
import { LoginRequest, RegisterRequest } from '../../Models/User/UserRequests';
import { baseUrl, headers } from '../SettingsLoader';

export const onLogin = async (data: LoginRequest) : Promise<Session> => {
    return await axios
        .post<Session>(baseUrl + "auth/login", data, {
            headers: headers
        })
        .then(response => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + response.data.token;
            console.log("Token: " + response.data.token);
            return response.data;
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
                    description: error.response.data
                };
            let session = new Session();
            session.error = errorModel;
            return session;
        })    
}

export const onRegister = async (data: RegisterRequest) => {
    const requestConfig: AxiosRequestConfig = {
        method: 'post',
        url: process.env.REACT_APP_API_BASE_URL + '/auth/register',
        headers: headers,
        data
    }
    try{
        const {data: response} = await axios.request(requestConfig);
        console.log(response);
    } catch (e) {
        console.error(e.response);
        return {error: e.response.data.message}
    }
}