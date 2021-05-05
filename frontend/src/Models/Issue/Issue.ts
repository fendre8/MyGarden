import Plant from "../Plant/Plant";
import User from "../User/User";
import Answer from "./Answer";

class Issue {
    id: number = 0;
    title: string = "";
    author: User = new User();
    plant: Plant = new Plant();
    description: string = "";
    image_path: string = "";
    answers: Answer[] = [];
    is_open: boolean = true;
}

export default Issue;