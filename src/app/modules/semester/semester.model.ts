import { model, Schema } from "mongoose";
import { TSemester } from "./semester.type";
import { Months, SemesterCode, SemesterName } from "./semester.constant";

const semesterSchema = new Schema<TSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: SemesterName,
    },
    code: {
      type: String,
      required: true,
      enum: SemesterCode,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  }
);

const Semester = model<TSemester>("semesters", semesterSchema);

export default Semester;
