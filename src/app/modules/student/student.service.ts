import { Student } from "./student.model";

const getAllStudentsFromDB = async () => {
  return await Student.find({});
};

export const studentServices = {
  getAllStudentsFromDB,
};
