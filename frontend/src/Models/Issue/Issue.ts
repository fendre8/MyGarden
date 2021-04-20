import Plant from "../Plant/Plant";
import User from "../User/User";
import Answer from "./Answer";

class Issue {
    title: string = "";
    author: string = "";
    plant: Plant = new Plant();
    description: string = "";
    image_path: string = "";
    answers: Answer[] = [];
}

export default Issue;