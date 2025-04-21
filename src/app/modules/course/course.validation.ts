import { z } from "zod";

const PreRequisiteCourseValidationSchema = z
  .object({
    course: z.string(),
    isDeleted: z.boolean().default(false),
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

const updateCourseValidationSchema = z.object({
  body: z
    .object({
      title: z.string().optional(),
      prefix: z.string().optional(),
      code: z.string().optional(),
      credit: z.number().optional(),
      prerequisiteCourses: z
        .array(PreRequisiteCourseValidationSchema)
        .optional(),
    })
    .strict(),
});

const mutateTeacherInCourseValidationSchema = z.object({
  body: z
    .object({
      teachers: z.array(z.string()),
      course: z.string().optional(),
    })
    .strict(),
});

export const courseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  mutateTeacherInCourseValidationSchema,
};
