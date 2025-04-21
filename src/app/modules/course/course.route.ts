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
courseRouter.get("/:id", courseController.getACourse);
courseRouter.delete("/:id", courseController.deleteACourse);
courseRouter.patch(
  "/:id",
  validateRequest(courseValidation.updateCourseValidationSchema),
  courseController.updateACourse
);

export default courseRouter;
