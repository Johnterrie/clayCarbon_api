import { Document } from "mongoose";

interface iUser extends Document {
  username: string;
  name: string;
  email: string;
  password: string;
}

export default iUser;
