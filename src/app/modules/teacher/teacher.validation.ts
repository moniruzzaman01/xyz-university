import { z } from "zod";
import { BloodGroup, Gender } from "./teacher.constant";

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: "First Name must start with a capital letter",
    }),
  middleName: z.string().optional(),
  lastName: z.string(),
});
const createTeacherValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    teacher: z.object({
      designation: z.string(),
      name: userNameValidationSchema,
      gender: z.enum(Gender),
      dateOfBirth: z.string(),
      email: z.string(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(BloodGroup),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImg: z.string(),
      department: z.string(),
      isDeleted: z.boolean(),
    }),
  }),
});

export const teacherValidation = { createTeacherValidationSchema };
