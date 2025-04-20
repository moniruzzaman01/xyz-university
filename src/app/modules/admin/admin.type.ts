import { Types } from "mongoose";
import { TBloodGroup, TGender, TName } from "../../globalTypes";

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TName;
  gender: TGender;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  isDeleted: boolean;
};
