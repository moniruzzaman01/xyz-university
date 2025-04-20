import QueryBuilder from "../../builder/QueryBuilder";
import Admin from "./admin.model";

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

export const adminServices = {
  getAllAdminFromDB,
  getAnAdminFromDB,
  deleteAnAdminFromDB,
};
