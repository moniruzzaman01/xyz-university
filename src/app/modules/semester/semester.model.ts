import { model, Schema } from "mongoose";
import { TMonths, TSemester } from "./semester.type";

const Months: TMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const semesterSchema = new Schema<TSemester>({
  name: {
    type: String,
    required: true,
    enum: ["Summer", "Autumn", "Fall"],
  },
  code: {
    type: String,
    required: true,
    enum: ["01", "02", "03"],
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
});

const Semester = model<TSemester>("semesters", semesterSchema);

export default Semester;
