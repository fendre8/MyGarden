import axios from "axios";
import Issue from "../Models/Issue/Issue";
import NewIssueData from "../Models/Issue/NewIssueData";
import { baseUrl, headers } from "./SettingsLoader";

export const getAllIssues = async (): Promise<Issue[]> => {
    return await axios
        .get(baseUrl + "issue",
            { headers: headers })
        .then(response => {
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
            { headers: headers })
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        })
}

export async function getIssueById(id: number): Promise<Issue> {
    return await axios.get(baseUrl + "issue/id/" + id)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log("Issue not found", err);
        });
}

export async function toggleIssueIsOpen(id: number) {
    return await axios.put(baseUrl + "issue/id/" + id + "/isopen")
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log("Issue not found", err);
        });
}

export async function add(issue: Issue) {
    const response = await axios.post<Issue>(baseUrl + "issue", issue);
    return response.data;
}

export async function remove(id: number) {
    const response = await axios.delete<number>(baseUrl + "issue/" + id);
    return response.data;
}

const exported = {
    getAllIssues,
    addNewIssue,
    getIssueById,
    toggleIssueIsOpen,
    add,
    remove
};

export default exported;