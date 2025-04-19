import { Types } from "mongoose";
import { TName } from "../../globalTypes";

export type TTeacher = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TName;
};
