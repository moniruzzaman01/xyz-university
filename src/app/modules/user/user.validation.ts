import { z } from "zod";

export const userValidation = z.object({
  id: z.string({ message: "id is required and must be a string!" }),
  password: z
    .string({ message: "password is required and must be a string!" })
    .min(6, { message: "password must have at least 6 characters!" }),
  needsPasswordChange: z
    .boolean({
      message: "needsPasswordChange is required and must be a boolean!",
    })
    .optional()
    .default(true),
  role: z.enum(["admin", "faculty", "student"]),
  status: z.enum(["in-progress", "blocked"]).default("in-progress"),
  isDeleted: z.boolean({
    message: "isDeleted is required and must be a boolean!",
  }),
});
