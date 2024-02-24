import { v4 as uuidv4 } from "uuid";

class UserModel {
  constructor(name, email, password) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export default UserModel;
