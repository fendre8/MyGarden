import Plant from "../Plant/Plant";
import User from "../User/User";
import Answer from "./Answer";

class NewIssueData {
    title: string = "";
    username: string = "";
    plantid: number = 0;
    description: string = "";
    image_path?: string = "";
}

export default NewIssueData;