import { z } from "zod";

const createDeptValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    faculty: z.string(),
  }),
});
const updateDeptValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    faculty: z.string().optional(),
  }),
});

export const deptValidation = {
  createDeptValidationSchema,
  updateDeptValidationSchema,
};
