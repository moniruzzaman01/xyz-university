import { Router } from "express";
import facultyController from "./faculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import { facultyValidation } from "./faculty.validation";

const facultyRouter = Router();

facultyRouter.post(
  "/create-a-faculty",
  validateRequest(facultyValidation.createFacultyValidationSchema),
  facultyController.createAFaculty
);

export default facultyRouter;
