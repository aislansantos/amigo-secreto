import { Router, Request, Response } from "express";
import * as Auth from "@/controllers/Auth.Controller";

const router = Router();

router.get("/ping", (req: Request, res: Response) => {
  res.json({ pong: true });
});
router.post("/login", Auth.login);

export default router;
