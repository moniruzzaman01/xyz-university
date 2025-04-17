import express from "express";
import studentController from "./student.controller";

const studentRouter = express.Router();

studentRouter.get("/", studentController.getAllStudents);
studentRouter.delete("/:id", studentController.deleteAStudent);

export default studentRouter;
