import User from "./user.schema";
import { TUser } from "./user.type";

export const createAnUserToDB = async (userData: TUser) => {
  return await User.create(userData);
};
