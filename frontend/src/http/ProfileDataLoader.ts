import axios from "axios"
import Issue from "../Models/Issue/Issue";
import NewIssueData from "../Models/Issue/NewIssueData";
import User from '../Models/User/User';
import { baseUrl, headers } from "./SettingsLoader";


export const getUserByName = async (username: string): Promise<User> => {
    return await axios
        .get(baseUrl + "profiles/name/" + username, 
        { headers: headers})
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log("No username", err);
        });
};

export const inviteFriend = async (username: string, friendName: string) => {
    return await axios
        .post(baseUrl + "profiles/friend", {
            "friendfrom" : username,
            "friendto" : friendName
        },
        { headers: headers})
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.log("Friendship failed", err);
        })
}

export const deleteFriend = async (username: string, friendName: string) => {
    return await axios
        .delete(baseUrl + "profiles/friend", {
            data: {
                "friendfrom" : username,
                "friendto" : friendName
            },
            headers : { headers: headers }
        })
        .then(response => {
            console.log("Deleted friendship", response.data)
        })
        .catch(err => {
            console.log(err);
        })
}

export const getAllIssues = async (): Promise<Issue[]> => {
    return await axios
        .get(baseUrl + "issue",
        {headers : headers})
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        })
}

export const addNewIssue = async (data: NewIssueData): Promise<Issue> => {
    console.log(data);
    return await axios
        .post(baseUrl + "issue", data,
        { headers: headers})
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        })
}