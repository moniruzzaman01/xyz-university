import express, { Application, Request, Response } from "express";
import cors from "cors";
import userRouter from "./app/modules/user/user.route";
import studentRouter from "./app/modules/student/student.route";

const app: Application = express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/students", studentRouter);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello Dev!");
});

export default app;
