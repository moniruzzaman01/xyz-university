import SemesterRegistration from "./sr.model";
import { TSemesterRegistration } from "./sr.type";

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  return SemesterRegistration.create(payload);
};

export const srService = {
  createSemesterRegistrationIntoDB,
};
