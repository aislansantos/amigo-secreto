import { Router } from "express";
import * as AuthController from "@/controllers/Auth.Controller";
import * as AuthMiddleware from "@/middleware/Auth.Middleware";

const router = Router();

router.get("/ping", AuthMiddleware.validateToken, AuthController.ping);
router.post("/login", AuthController.login);

export default router;
