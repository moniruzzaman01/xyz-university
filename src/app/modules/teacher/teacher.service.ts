import QueryBuilder from "../../builder/QueryBuilder";
import Teacher from "./teacher.model";

const getAllTeacherFromDB = async (query: Record<string, unknown>) => {
  return await new QueryBuilder(Teacher.find(), query)
    .search(["email", "name.firstName"])
    .filter()
    .sort()
    .pagination()
    .projection()
    .build()
    .populate("user")
    .populate("department");
};

const getATeacherFromDB = async (id: string) => {
  return await Teacher.findOne({ id, isDeleted: false });
};

const deleteATeacherFromDB = async (id: string) => {
  return await Teacher.findOneAndUpdate(
    { id },
    { isDeleted: true },
    { new: true }
  );
};

export const teacherServices = {
  getAllTeacherFromDB,
  getATeacherFromDB,
  deleteATeacherFromDB,
};
