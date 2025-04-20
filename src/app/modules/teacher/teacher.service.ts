import QueryBuilder from "../../builder/QueryBuilder";
import Teacher from "./teacher.model";
import { TTeacher } from "./teacher.type";
import { teacherValidation } from "./teacher.validation";

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

const updateATeacherFromDB = async (id: string, payload: Partial<TTeacher>) => {
  const { name, ...remaining } = payload;
  const modifiedPayload: Record<string, unknown> = { ...remaining };

  if (name) {
    // // option-1
    // for (let key of Object.keys(name) as Array<keyof TName>) {
    //   modifiedPayload[`name.${key}`] = name[key];
    //   }

    // //   option-2
    // for (let key of Object.keys(name)) {
    //   modifiedPayload[`name.${key}`] = name[key as keyof TName];
    //   }

    //   option-3
    for (let key of Object.keys(name)) {
      modifiedPayload[`name.${key}`] = name[key as keyof typeof name];
    }
  }
  return await Teacher.findOneAndUpdate({ id }, modifiedPayload, { new: true });
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
  updateATeacherFromDB,
};
