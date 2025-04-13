import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import userRouter from "./app/modules/user/user.route";
import studentRouter from "./app/modules/student/student.route";
import globalErrorHanlder from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/router";

const app: Application = express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1", router);
// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/students", studentRouter);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello Dev!");
});

//global error handler
app.use(globalErrorHanlder);
//not found route
app.use(notFound);

export default app;
