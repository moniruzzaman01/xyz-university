import express from "express";
import userController from "./user.controller";
import { studentValidation } from "../student/student.validation";
import validateRequest from "../../middlewares/validateRequest";
import { teacherValidation } from "../teacher/teacher.validation";

const userRouter = express.Router();

userRouter.post(
  "/create-student",
  validateRequest(studentValidation.createStudentValidationSchema),
  userController.createAStudent
);
userRouter.post(
  "/create-teacher",
  validateRequest(teacherValidation.createTeacherValidationSchema),
  userController.createATeacher
);

export default userRouter;
