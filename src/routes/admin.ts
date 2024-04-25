import { Router } from "express";
import * as AuthController from "@/controllers/Auth.Controller";
import * as EventsController from "@/controllers/Events.Controller";
import * as GroupsController from "@/controllers/Groups.Controller";
import * as AuthMiddleware from "@/middleware/Auth.Middleware";

const router = Router();
// Rota de ping teste
router.get("/ping", AuthMiddleware.validateToken, AuthController.ping);

// Rota de Login
router.post("/login", AuthController.login);

// Routas Eventos
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
router.delete(
  "/events/:id",
  AuthMiddleware.validateToken,
  EventsController.removeEvent,
);

// Rotas Grupos
router.get(
  "/events/:id_event",
  AuthMiddleware.validateToken,
  GroupsController.getAll,
);

export default router;
