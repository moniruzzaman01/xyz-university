import express from "express";
import studentController from "./student.controller";

const studentRouter = express.Router();

studentRouter.get("/", studentController.getAllStudents);

export default studentRouter;
