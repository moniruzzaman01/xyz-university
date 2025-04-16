import { model, Schema } from "mongoose";
import { TDept } from "./dept.type";

const departmentSchema = new Schema<TDept>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  faculty: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Dept = model<TDept>("departments", departmentSchema);

export default Dept;
