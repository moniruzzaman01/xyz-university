import AppError from "../../utils/AppError";
import Semester from "../semester/semester.model";
import { Status } from "./sr.constant";
import SemesterRegistration from "./sr.model";
import { TSemesterRegistration } from "./sr.type";

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  const { semester } = payload;
  //semester exist or not
  const isExist = await Semester.findById(semester);
  if (!isExist) {
    throw new AppError(404, "Semester not found!");
  }
  //semester already registered or not
  const registeredSemester = await SemesterRegistration.findOne({ semester });
  if (registeredSemester) {
    throw new AppError(409, "this semester is already registered");
  }

  // UPCOMING/ONGOING semester already exist or not
  const isExistOngoingOrUpcoming = await SemesterRegistration.findOne({
    $or: [{ status: Status[0] }, { status: Status[1] }],
  });
  if (isExistOngoingOrUpcoming) {
    throw new AppError(
      409,
      `there is already a semester exist in db with status ${isExistOngoingOrUpcoming.status}`
    );
  }
  return await SemesterRegistration.create(payload);
};

export const srService = {
  createSemesterRegistrationIntoDB,
};
