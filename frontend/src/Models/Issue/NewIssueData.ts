import Plant from "../Plant/Plant";
import User from "../User/User";
import Answer from "./Answer";

class NewIssueData {
    title: string = "";
    username: string = "";
    plantName: string = "";
    description: string = "";
    image_path?: string = "";
}

export default NewIssueData;