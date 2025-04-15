import { TSemester } from "../semester/semester.type";
import User from "./user.model";

const getLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: "student" }, { _id: 1, id: 1 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id : null;
};
export const generateStudentId = async (payload: TSemester) => {
  const currentId = (await getLastStudentId())?.substring(6) || "0";

  //there is a bug here. for different semester and year student id will start from one and the increment

  // const lastStudentId = await findLastStudentId();
  // // 2030 01 0001
  // const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01;
  // const lastStudentYear = lastStudentId?.substring(0, 4); // 2030
  // const currentSemesterCode = payload.code;
  // const currentYear = payload.year;

  // if (
  //   lastStudentId &&
  //   lastStudentSemesterCode === currentSemesterCode &&
  //   lastStudentYear === currentYear
  // ) {
  //   currentId = lastStudentId.substring(6); // 00001
  // }

  const incrementedId = (Number(currentId) + 1).toString().padStart(4, "0");
  return `${payload.year}${payload.code}${incrementedId}`;
};
