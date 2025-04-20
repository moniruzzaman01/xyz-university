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

export const teacherServices = {
  getAllTeacherFromDB,
};
