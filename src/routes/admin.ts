import { Router } from "express";
import * as AuthController from "@/controllers/Auth.Controller";
import * as EventsController from "@/controllers/Events.Controller";
import * as AuthMiddleware from "@/middleware/Auth.Middleware";

const router = Router();

router.get("/ping", AuthMiddleware.validateToken, AuthController.ping);

router.post("/login", AuthController.login);

router.get("/events", AuthMiddleware.validateToken, EventsController.getAll);
router.get(
  "/events/:id",
  AuthMiddleware.validateToken,
  EventsController.getEvent,
);
router.post("/events", AuthMiddleware.validateToken, EventsController.addEvent);
router.put(
  "/events/:id",
  AuthMiddleware.validateToken,
  EventsController.updateEvent,
);

export default router;
