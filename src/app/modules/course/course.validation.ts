import { z } from "zod";

const PreRequisiteCourseValidationSchema = z
  .object({
    course: z.string(),
    isDeleted: z.boolean().optional(),
  })
  .strict();

const createCourseValidationSchema = z.object({
  body: z
    .object({
      title: z.string(),
      prefix: z.string(),
      code: z.string(),
      credit: z.number(),
      prerequisiteCourses: z
        .array(PreRequisiteCourseValidationSchema)
        .optional(),
      isDeleted: z.boolean().default(false),
    })
    .strict(),
});

export const courseValidation = {
  createCourseValidationSchema,
};
