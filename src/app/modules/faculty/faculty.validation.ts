import { z } from "zod";

const createFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      message: "Faculty name must be a string!",
    }),
  }),
});
const updateFacultyValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        message: "Faculty name must be a string!",
      })
      .min(2),
  }),
});

export const facultyValidation = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
