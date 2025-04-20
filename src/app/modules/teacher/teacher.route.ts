import { Router } from "express";
import teacherController from "./teacher.controller";

const teacherRouter = Router();

teacherRouter.get("/", teacherController.getAllTeacher);

export default teacherRouter;
