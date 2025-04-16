import Dept from "./dept.model";
import { TDept } from "./dept.type";

const createADeptIntoDB = async (payload: TDept) => {
  return await Dept.create(payload);
};
const getAllDeptsFromDB = async () => {
  return await Dept.find({});
};
const getADeptFromDB = async (id: string) => {
  return await Dept.findById(id);
};
const updateADeptFromDB = async (id: string, payload: Partial<TDept>) => {
  return await Dept.findOneAndUpdate({ _id: id }, payload, { new: true });
};

export const deptService = {
  createADeptIntoDB,
  getAllDeptsFromDB,
  getADeptFromDB,
  updateADeptFromDB,
};
