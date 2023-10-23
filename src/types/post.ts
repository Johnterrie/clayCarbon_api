import { Document } from "mongoose";

export interface iPost extends Document {
  title: string;
  description: string;
  vote: number;
  user: string;
}
