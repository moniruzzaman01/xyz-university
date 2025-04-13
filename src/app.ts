import express, { Application, Request, Response } from "express";
import cors from "cors";
import userRouter from "./app/modules/user/user.route";

const app: Application = express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/user", userRouter);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello Dev!");
});

export default app;
