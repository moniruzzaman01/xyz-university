import { Router } from "express";
import deptController from "./dept.controller";

const deptRouter = Router();

deptRouter.post("/create-a-department", deptController.createADept);
deptRouter.get("/", deptController.getAllDepts);
deptRouter.get("/:id", deptController.getADept);

export default deptRouter;
