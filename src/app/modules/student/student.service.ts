import mongoose from "mongoose";
import { Student } from "./student.model";
import User from "../user/user.model";
import AppError from "../../utils/AppError";
import { TStudent } from "./student.type";

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  let searchParam = "";
  if (query.searchParam) {
    searchParam = query.searchParam as string;
  }

  return await Student.find({
    $or: ["email", "name.firstName", "name.middleName", "name.lastName"].map(
      (field) => ({ [field]: { $regex: searchParam, $options: "i" } })
    ),
  })
    .populate("user")
    .populate("semester")
    .populate({
      path: "department",
      populate: "faculty",
    });
};
const getAStudentFromDB = async (id: string) => {
  return await Student.findOne({ id })
    .populate("user")
    .populate("semester")
    .populate({
      path: "department",
      populate: "faculty",
    });
};
const deleteAStudentFromDB = async (id: string) => {
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
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedStudent) {
      throw new AppError(400, `failed to delete the student with id: ${id}`);
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error.message);
  }
};
const updateAStudentIntoDB = async (id: string, payload: TStudent) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const studentServices = {
  getAllStudentsFromDB,
  deleteAStudentFromDB,
  updateAStudentIntoDB,
  getAStudentFromDB,
};
