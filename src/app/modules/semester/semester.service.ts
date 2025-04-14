import { ObjectId, Types } from "mongoose";
import Semester from "./semester.model";
import { TSemester } from "./semester.type";

const createASemesterIntoDB = async (payload: TSemester) => {
  const semesterCodeMapper: { [key: string]: string } = {
    Autumn: "01",
    Summer: "02",
    Fall: "03",
  };
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

export const semesterServices = {
  createASemesterIntoDB,
  getAllSemestersFromDB,
  getASemesterFromDB,
};
