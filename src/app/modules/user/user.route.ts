import express from "express";
import userController from "./user.controller";
import { studentValidation } from "../student/student.validation";
import validateRequest from "../../middlewares/validateRequest";

const userRouter = express.Router();

userRouter.post(
  "/create-student",
  // validateRequest(studentValidation.createStudentValidationSchema),
  userController.createAStudent
);

export default userRouter;
