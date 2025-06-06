import { model, Schema } from "mongoose";
import { TDept } from "./dept.type";
import AppError from "../../utils/AppError";

const departmentSchema = new Schema<TDept>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "faculties",
    },
  },
  {
    timestamps: true,
  }
);

//middlewares
departmentSchema.pre("save", async function (next) {
  const isExist = await Dept.findOne({ name: this.name });
  if (isExist) {
    throw new Error(`${this.name} department already exist!`);
  }
  next();
});
departmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isExist = await Dept.findOne(query);
  if (!isExist) {
    throw new AppError(404, `department not found with id:${query._id}!`);
  }
  next();
});

const Dept = model<TDept>("departments", departmentSchema);

export default Dept;
