import Faculty from "./faculty.model";
import { TFaculty } from "./faculty.type";

const createAFacultyIntoDB = async (payload: TFaculty) => {
  return await Faculty.create(payload);
};

export const facultyService = {
  createAFacultyIntoDB,
};
