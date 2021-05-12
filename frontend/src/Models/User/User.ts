import Issue from "../Issue/Issue";
import Plant from "../Plant/Plant";

class User {
    id: number = -1;
    username: string = '';
    email: string = '';
    first_name: string = '';
    last_name: string = '';
    friends?: string[];
    plants?: Plant[];
    issues?: Issue[];
    picture?: string;
}

export default User;