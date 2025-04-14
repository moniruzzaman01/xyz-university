import Semester from "./semester.model";
import { TSemester } from "./semester.type";

const semesterCodeMapper: { [key: string]: string } = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};
const createASemesterIntoDB = async (payload: TSemester) => {
  if (semesterCodeMapper[payload.name] != payload.code) {
    throw new Error("Semester name and code mismatched!");
  }

  return await Semester.create(payload);
};

const getAllSemestersFromDB = async () => {
  return await Semester.find({});
};

const getASemesterFromDB = async (id: string) => {
  return await Semester.findById(id);
};

const updateASemesterFromDB = async (
  id: string,
  payload: Partial<TSemester>
) => {
  if (
    payload.name &&
    payload.code &&
    semesterCodeMapper[payload.name] != payload.code
  ) {
    throw new Error("Semester name and code mismatched!");
  }

  return await Semester.findOneAndUpdate({ _id: id }, payload, { new: true });
};

export const semesterServices = {
  createASemesterIntoDB,
  getAllSemestersFromDB,
  getASemesterFromDB,
  updateASemesterFromDB,
};
