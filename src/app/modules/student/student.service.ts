import mongoose from "mongoose";
import { Student } from "./student.model";
import User from "../user/user.model";
import AppError from "../../utils/AppError";

const getAllStudentsFromDB = async () => {
  return await Student.find({}).populate("user").populate("semester").populate({
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

export const studentServices = {
  getAllStudentsFromDB,
  deleteAStudentFromDB,
};
