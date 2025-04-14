import Semester from "./semester.model";
import { TSemester } from "./semester.type";

const createASemesterIntoDB = async (payload: TSemester) => {
  return await Semester.create(payload);
};

export const semesterServices = {
  createASemesterIntoDB,
};
