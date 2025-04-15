import { model, Schema } from "mongoose";
import { TFaculty } from "./faculty.type";

const facultySchema = new Schema<TFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Faculty = model<TFaculty>("faculties", facultySchema);

export default Faculty;
