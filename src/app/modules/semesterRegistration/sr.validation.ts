import { z } from "zod";
import { Status } from "./sr.constant";

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    semester: z.string(),
    status: z.enum(Status),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number().default(3),
    maxCredit: z.number().default(15),
    isDeleted: z.boolean().default(false),
  }),
});

export const srValidations = {
  createSemesterRegistrationValidationSchema,
};
