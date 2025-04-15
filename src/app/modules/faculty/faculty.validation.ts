import { z } from "zod";

const createFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      message: "Faculty name must be a string!",
    }),
  }),
});

export const facultyValidation = {
  createFacultyValidationSchema,
};
