import Dept from "./dept.model";
import { TDept } from "./dept.type";

const createADeptIntoDB = async (payload: TDept) => {
  return await Dept.create(payload);
};

export const deptService = {
  createADeptIntoDB,
};
