import express from "express";
import studentController from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidation } from "./student.validation";

const studentRouter = express.Router();

studentRouter.get("/", studentController.getAllStudents);
studentRouter.get("/:id", studentController.getAStudent);
studentRouter.delete("/:id", studentController.deleteAStudent);
studentRouter.patch(
  "/:id",
  validateRequest(studentValidation.updateStudentValidationSchema),
  studentController.updateAStudent
);

export default studentRouter;
