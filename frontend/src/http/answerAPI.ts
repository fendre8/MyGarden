import axios from "axios";
import Answer from "../Models/Issue/Answer";
import { baseUrl, headers } from "./SettingsLoader";

export const addNewAnswer = async (issueId: number, answerText: string, userId: number): Promise<Answer> => {
    return await axios
        .post<Answer>(baseUrl + "issue/" + issueId, {userId, answerText},
            { headers: headers })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

// export async function remove(id: number) {
//     const response = await axios.delete<number>(baseUrl + "issue/" + id);
//     return response.data;
// }

const exported = {
    addNewAnswer
};

export default exported;