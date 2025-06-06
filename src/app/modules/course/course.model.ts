import { model, Schema } from "mongoose";
import { TCourse, TCourseTeacher, TPrerequisiteCourse } from "./course.type";

const prerequisiteCourseSchema = new Schema<TPrerequisiteCourse>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "courses",
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    prefix: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    credit: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    prerequisiteCourses: [prerequisiteCourseSchema],
  },
  {
    timestamps: true,
  }
);

const courseTeacherSchema = new Schema<TCourseTeacher>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "courses",
    required: true,
    // unique: true,
  },
  teachers: [
    {
      type: Schema.Types.ObjectId,
      ref: "teachers",
      // unique: true,
      required: true,
    },
  ],
});
export const CourseTeacher = model<TCourseTeacher>(
  "course-teachers",
  courseTeacherSchema
);

const Course = model<TCourse>("courses", courseSchema);
export default Course;
