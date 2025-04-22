import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { srValidations } from "./sr.validation";
import srController from "./sr.controller";

const srRouter = Router();

srRouter.post(
  "/create-semester-registration",
  // validateRequest(srValidations.createSemesterRegistrationValidationSchema),
  srController.createSemesterRegistration
);
srRouter.get(
  "/",
  // validateRequest(srValidations.createSemesterRegistrationValidationSchema),
  srController.getAllSemesterRegistration
);

export default srRouter;
