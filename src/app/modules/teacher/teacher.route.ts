import { Router } from "express";
import teacherController from "./teacher.controller";

const teacherRouter = Router();

teacherRouter.get("/", teacherController.getAllTeacher);
teacherRouter.get("/:id", teacherController.getATeacher);
teacherRouter.delete("/:id", teacherController.deleteATeacher);

export default teacherRouter;
