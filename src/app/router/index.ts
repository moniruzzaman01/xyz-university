import { Router } from "express";
import userRouter from "../modules/user/user.route";
import studentRouter from "../modules/student/student.route";

const router = Router();

//type 1
// router.use("/users", userRouter);
// router.use("/students", studentRouter);

//type 2
const routes = [
  {
    path: "/users",
    router: userRouter,
  },
  {
    path: "/students",
    router: studentRouter,
  },
];
routes.forEach((item) => router.use(item.path, item.router));

export default router;
