import { model, Schema } from "mongoose";
import { Status } from "./sr.constant";
import { TSemesterRegistration } from "./sr.type";

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    semester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "semesters",
    },
    status: {
      type: String,
      enum: Status,
      default: Status[0],
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const SemesterRegistration = model<TSemesterRegistration>(
  "semester-registrations",
  semesterRegistrationSchema
);
export default SemesterRegistration;
