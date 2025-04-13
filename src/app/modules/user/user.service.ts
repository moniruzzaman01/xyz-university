import config from "../../config";
import { Student } from "../student/student.model";
import { TStudent } from "../student/student.type";
import User from "./user.model";
import { TUser } from "./user.type";

const createAStudentIntoDB = async (password: string, payload: TStudent) => {
  //create an empty user object
  const userData: Partial<TUser> = {};
  //set password if not given
  userData.password = password || config.default_pass;
  //set student role
  userData.role = "student";
  //set generated user id
  userData.id = "2030100001";
  //create an user
  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    //embded user generated id and reference user _id
    payload.id = newUser.id;
    payload.user = newUser._id;
    //create a student
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const userServices = {
  createAStudentIntoDB,
};
