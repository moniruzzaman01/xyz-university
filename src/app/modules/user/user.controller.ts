import { Request, Response } from "express";
import { userValidation } from "./user.validation";
import { userServices } from "./user.service";

const createAStudent = async (req: Request, res: Response) => {
  try {
    const { password, student } = req.body;
    //zod validation
    // const validation = userValidation.safeParse(userData);

    const result = await userServices.createAStudentIntoDB(password, student);
    res.status(200).json({
      success: true,
      message: "user created successfully!",
      data: result,
    });
    // if (validation.success) {
    //   const result = await userService.createAStudentIntoDB(password, student);
    //   res.status(200).json({
    //     success: true,
    //     message: "user created successfully!",
    //     data: result,
    //   });
    // } else {
    //   res.status(400).json({
    //     success: true,
    //     message: "user validation failed!",
    //     data: validation.error,
    //   });
    // }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "something went wrong!",
      error: error.message,
    });
  }
};

export default { createAStudent };
