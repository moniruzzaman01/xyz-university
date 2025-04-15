import { TSemester } from "../semester/semester.type";
import User from "./user.model";

const getLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: "student" }, { _id: 1, id: 1 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(6) : null;
};
export const generateStudentId = async (payload: TSemester) => {
  const currentId = (await getLastStudentId()) || "0";
  const incrementedId = (Number(currentId) + 1).toString().padStart(4, "0");
  return `${payload.year}${payload.code}${incrementedId}`;
};
