import { ObjectId } from "mongoose";
import Faculty from "./faculty.model";
import { TFaculty } from "./faculty.type";

const createAFacultyIntoDB = async (payload: TFaculty) => {
  return await Faculty.create(payload);
};
const getAllFacultiesFromDB = async () => {
  return await Faculty.find({});
};
const getAFacultyFromDB = async (id: string) => {
  return await Faculty.findById(id);
};

export const facultyService = {
  createAFacultyIntoDB,
  getAllFacultiesFromDB,
  getAFacultyFromDB,
};
