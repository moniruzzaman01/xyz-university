import { Router } from "express";
import userRouter from "../modules/user/user.route";
import studentRouter from "../modules/student/student.route";
import semesterRouter from "../modules/semester/semester.route";
import facultyRouter from "../modules/faculty/faculty.route";
import deptRouter from "../modules/department/dept.route";
import teacherRouter from "../modules/teacher/teacher.route";

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
  {
    path: "/semesters",
    router: semesterRouter,
  },
  {
    path: "/faculties",
    router: facultyRouter,
  },
  {
    path: "/departments",
    router: deptRouter,
  },
  {
    path: "/teachers",
    router: teacherRouter,
  },
];
routes.forEach((item) => router.use(item.path, item.router));

export default router;
