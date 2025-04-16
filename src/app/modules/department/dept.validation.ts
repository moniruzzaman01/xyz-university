import { z } from "zod";

const createDeptValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    faculty: z.string(),
  }),
});

export const deptValidation = {
  createDeptValidationSchema,
};
