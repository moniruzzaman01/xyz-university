import { Student } from "./student.model";

const getAllStudentsFromDB = async () => {
  return await Student.find({}).populate("user").populate("semester").populate({
    path: "department",
    populate: "faculty",
  });
};

export const studentServices = {
  getAllStudentsFromDB,
};
