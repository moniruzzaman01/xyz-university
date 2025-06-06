import { z } from "zod";
import { BloodGroup, Gender } from "./admin.constant";

const userNameValidationSchema = z
  .object({
    firstName: z
      .string()
      .min(1)
      .max(20)
      .refine((value) => /^[A-Z]/.test(value), {
        message: "First Name must start with a capital letter",
      }),
    middleName: z.string().optional(),
    lastName: z.string(),
  })
  .strict();

const createAdminValidationSchema = z.object({
  body: z
    .object({
      password: z.string().optional(),
      admin: z
        .object({
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
          isDeleted: z.boolean().default(false),
        })
        .strict(),
    })
    .strict(),
});
const updateAdminValidationSchema = z.object({
  body: z
    .object({
      // admin: z
      //   .object({
      designation: z.string().optional(),
      name: userNameValidationSchema.partial().optional(),
      gender: z.enum(Gender).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z.enum(BloodGroup).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImg: z.string().optional(),
      // })
      // .strict(),
    })
    .strict(),
});

export const adminValidation = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
