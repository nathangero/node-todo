import { Router } from "express";
import { Request, Response } from "express";
const router = Router();

import todoRoutes from "./todo-routes";

router.get("/", (req: Request, res: Response) => {
  // console.log("server ping");
  res.send("Welcome to the server!");
});

router.use("/todos", todoRoutes);

export default router;