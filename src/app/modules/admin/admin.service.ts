import QueryBuilder from "../../builder/QueryBuilder";
import Admin from "./admin.model";
import { TAdmin } from "./admin.type";

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
  return await Admin.findOneAndUpdate(
    { id },
    { isDeleted: true },
    { new: true }
  );
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
