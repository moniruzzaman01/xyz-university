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
  const searchCondition = searchParam
    ? {
        $or: [
          "email",
          "name.firstName",
          "name.middleName",
          "name.lastName",
        ].map((field) => ({ [field]: { $regex: searchParam, $options: "i" } })),
      }
    : {}; //search condition will create if the search param exist

  const filter = { ...query }; //create a copy of query
  ["searchParam", "sort", "limit", "page"].forEach((el) => delete filter[el]); //remove other property (searchParam, sort, limit) from the filter except query field

  let sort = "-createdAt"; //default sort
  if (query.sort) sort = query.sort as string; //sort from query data

  let limit = 10; //default limit no 10
  let page = 0; //default page no 0
  let skip = 0; //default skip 0
  if (query.page) page = Number(query.page); //set page no from query
  if (query.limit) limit = Number(query.limit); //set limit no from query
  if (page) skip = (page - 1) * limit; //calculate how many data will be skipped

  console.log(limit, page, skip);

  return await Student.find({ ...searchCondition, ...filter })
    .sort(sort)
    .skip(skip)
    .limit(limit)
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
