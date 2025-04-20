import QueryBuilder from "../../builder/QueryBuilder";
import Course from "./course.model";
import { TCourse } from "./course.type";

const createACourseIntoDB = async (payload: TCourse) => {
  return await Course.create(payload);
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  return await new QueryBuilder(Course.find(), query)
    .search(["title", "prefix", "code"])
    .filter()
    .sort()
    .pagination()
    .projection()
    .build();
};

export const courseServices = {
  createACourseIntoDB,
  getAllCoursesFromDB,
};
