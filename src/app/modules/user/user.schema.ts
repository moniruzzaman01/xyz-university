import { model, Schema } from "mongoose";
import { TUser } from "./user.type";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["admin", "faculty", "student"],
      required: true,
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<TUser>("users", userSchema);
export default User;
