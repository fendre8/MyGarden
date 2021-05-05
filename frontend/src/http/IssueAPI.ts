import axios from "axios";
import Issue from "../Models/Issue/Issue";
import { baseUrl } from "./SettingsLoader";

export async function getAll() {
    const response = await axios.get<Issue[]>(baseUrl + "issues");
    return response.data;
}

export async function add(issue: Issue) {
    issue.id = 0;
    const response = await axios.post<Issue>(baseUrl + "issue", issue);
    return response.data;
}

export async function remove(id: number) {
    const response = await axios.delete<number>(baseUrl + "issue/" + id);
    return response.data;
}

const exported = {
    getAll,
    add,
    remove
};

export default exported;