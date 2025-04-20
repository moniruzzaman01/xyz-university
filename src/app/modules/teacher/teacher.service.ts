import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import Teacher from "./teacher.model";
import { TTeacher } from "./teacher.type";
import { teacherValidation } from "./teacher.validation";
import AppError from "../../utils/AppError";
import User from "../user/user.model";

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
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(400, `failed to delete the user with id: ${id}`);
    }
    const deletedTeacher = await Teacher.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedTeacher) {
      throw new AppError(400, `failed to delete the teacher with id: ${id}`);
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedTeacher;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const teacherServices = {
  getAllTeacherFromDB,
  getATeacherFromDB,
  deleteATeacherFromDB,
  updateATeacherFromDB,
};
