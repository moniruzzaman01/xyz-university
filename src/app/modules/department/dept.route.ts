import { Router } from "express";
import deptController from "./dept.controller";

const deptRouter = Router();

deptRouter.post("/create-a-department", deptController.createADept);
deptRouter.get("/", deptController.getAllDepts);
deptRouter.get("/:id", deptController.getADept);
deptRouter.patch("/:id", deptController.updateADept);

export default deptRouter;
