import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import Admin from "./admin.model";
import { TAdmin } from "./admin.type";
import User from "../user/user.model";
import AppError from "../../utils/AppError";

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  return await new QueryBuilder(Admin.find(), query)
    .search(["email", "name.firstName", "name.middleName", "name.lastName"])
    .filter()
    .sort()
    .pagination()
    .projection()
    .build();
};

const getAnAdminFromDB = async (id: string) => {
  return await Admin.findOne({ id, isDeleted: false });
};

const deleteAnAdminFromDB = async (id: string) => {
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
    const deletedAdmin = await Admin.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedAdmin) {
      throw new AppError(400, `failed to delete the admin with id: ${id}`);
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  // return await Admin.findOneAndUpdate(
  //   { id },
  //   { isDeleted: true },
  //   { new: true }
  // );
};

const updateAnAdminFromDB = async (id: string, payload: TAdmin) => {
  const { name, ...remaining } = payload;
  const modifiedPayload: Record<string, unknown> = { ...remaining };

  if (name) {
    for (let [key, val] of Object.entries(name)) {
      modifiedPayload[`name.${key}`] = val;
    }
  }
  const updatedAdmin = await Admin.findOneAndUpdate({ id }, modifiedPayload, {
    new: true,
  });
  return updatedAdmin;
};

export const adminServices = {
  getAllAdminFromDB,
  getAnAdminFromDB,
  deleteAnAdminFromDB,
  updateAnAdminFromDB,
};
