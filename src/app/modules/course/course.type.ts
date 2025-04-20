import { Types } from "mongoose";

export type TPrerequisiteCourse = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: string;
  credit: number;
  isDeleted: boolean;
  prerequisiteCourses: [TPrerequisiteCourse];
};
