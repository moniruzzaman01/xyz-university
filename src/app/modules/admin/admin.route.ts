import { Router } from "express";
import adminController from "./admin.controller";

const adminRouter = Router();

adminRouter.get("/", adminController.getAllAdmin);
adminRouter.get("/:id", adminController.getAnAdmin);
adminRouter.delete("/:id", adminController.deleteAnAdmin);

export default adminRouter;
