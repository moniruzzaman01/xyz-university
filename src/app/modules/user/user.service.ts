import mongoose from "mongoose";
import config from "../../config";
import Semester from "../semester/semester.model";
import { Student } from "../student/student.model";
import { TStudent } from "../student/student.type";
import { generateStudentId } from "./student.utils";
import User from "./user.model";
import { TUser } from "./user.type";
import AppError from "../../utils/AppError";

const createAStudentIntoDB = async (password: string, payload: TStudent) => {
  //create an empty user object
  const userData: Partial<TUser> = {};
  //set password if not given
  userData.password = password || config.default_pass;
  //set student role
  userData.role = "student";
  //set generated user id
  const semester = await Semester.findById(payload.semester);
  if (!semester) {
    throw new Error("Semester not found with the given ID.");
  }
  //mongoose transaction
  const session = await mongoose.startSession(); //create session
  try {
    session.startTransaction(); //start transaction
    userData.id = await generateStudentId(semester);
    //create an user
    const newUser = new User(userData);
    await newUser.save({ session });
    if (!newUser.id) {
      throw new AppError(400, "failed to create an user!");
    }
    //embded user generated id and reference user _id
    payload.id = newUser.id;
    payload.user = newUser._id;

    //create a student
    const newStudent = new Student(payload);
    await newStudent.save({ session });
    if (!newStudent.id) {
      throw new AppError(400, "failed to create a student!");
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error.message);
  }
};

export const userServices = {
  createAStudentIntoDB,
};
