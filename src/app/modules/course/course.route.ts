import { Router } from "express";
import courseController from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import { courseValidation } from "./course.validation";

const courseRouter = Router();

courseRouter.post(
  "/create-course",
  validateRequest(courseValidation.createCourseValidationSchema),
  courseController.createACourse
);
courseRouter.get("/", courseController.getAllCourses);

export default courseRouter;
