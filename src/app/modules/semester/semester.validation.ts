import { z } from "zod";
import { Months, SemesterCode, SemesterName } from "./semester.constant";

const semesterBodySchema = {
  name: z.enum(SemesterName),
  code: z.enum(SemesterCode),
  year: z.string(),
  startMonth: z.enum(Months),
  endMonth: z.enum(Months),
};

const createSemesterValidationSchema = z.object({
  body: z.object(semesterBodySchema),
});
const updateSemesterValidationSchema = z.object({
  body: z.object(semesterBodySchema).partial(),
});

export const semesterValidation = {
  createSemesterValidationSchema,
  updateSemesterValidationSchema,
};
