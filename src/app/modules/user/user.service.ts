import mongoose from "mongoose";
import config from "../../config";
import Semester from "../semester/semester.model";
import { Student } from "../student/student.model";
import { TStudent } from "../student/student.type";
import { generateStudentId } from "./student.utils";
import User from "./user.model";
import { TUser } from "./user.type";
import AppError from "../../utils/AppError";
import { TTeacher } from "../teacher/teacher.type";
import Dept from "../department/dept.model";
import Teacher from "../teacher/teacher.model";
import { generateTeacherId } from "../teacher/teacher.utils";
import { TAdmin } from "../admin/admin.type";
import { generateAdminId } from "../admin/admin.utils";
import Admin from "../admin/admin.model";

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

    //embded user generated id and reference user _id
    payload.id = newUser.id;
    payload.user = newUser._id;

    //create a student
    const newStudent = new Student(payload);
    await newStudent.save({ session });

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const createATeacherIntoDB = async (password: string, payload: TTeacher) => {
  const userData: Partial<TUser> = {};
  userData.password = password || config.default_pass;
  userData.role = "teacher";

  const department = await Dept.findById(payload.department);
  if (!department) {
    throw new AppError(400, "Invalid department id!");
  }

  //mongoose transaction
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateTeacherId();

    const newUser = new User(userData);
    await newUser.save({ session });

    payload.id = newUser.id;
    payload.user = newUser._id;

    const newTeacher = new Teacher(payload);
    await newTeacher.save({ session });

    await session.commitTransaction();
    await session.endSession();
    return newTeacher;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const createAnAdminIntoDB = async (password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {};
  userData.password = config.default_pass;
  userData.role = "admin";

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateAdminId();

    const newUser = new User(userData);
    await newUser.save({ session });

    payload.id = newUser.id;
    payload.user = newUser._id;

    const newAdmin = new Admin(payload);
    await newAdmin.save({ session });

    await session.commitTransaction();
    await session.endSession();
    return payload;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const userServices = {
  createAStudentIntoDB,
  createATeacherIntoDB,
  createAnAdminIntoDB,
};
