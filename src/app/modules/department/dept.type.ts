import { Types } from "mongoose";

export type TDept = {
  name: string;
  faculty: Types.ObjectId;
};
