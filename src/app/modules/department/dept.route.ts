import { Router } from "express";
import deptController from "./dept.controller";

const deptRouter = Router();

deptRouter.post("/create-a-department", deptController.createADept);

export default deptRouter;
