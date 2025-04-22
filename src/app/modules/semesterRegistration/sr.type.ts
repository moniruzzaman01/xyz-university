import { Types } from "mongoose";

export type TSemesterRegistration = {
  semester: Types.ObjectId;
  status: "UPCOMING" | "ONGOING" | "END";
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
  isDeleted: boolean;
};
