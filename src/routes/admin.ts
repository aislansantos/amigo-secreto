import { Router } from "express";
import * as AuthController from "@/controllers/Auth.Controller";
import * as EventsController from "@/controllers/Events.Controller";
import * as GroupsController from "@/controllers/Groups.Controller";
import * as PeopleController from "@/controllers/People.Controller";
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
  "/events/:id_event/groups",
  AuthMiddleware.validateToken,
  GroupsController.getAll,
);
router.get(
  "/events/:id_event/groups/:id",
  AuthMiddleware.validateToken,
  GroupsController.getGroup,
);
router.post(
  "/events/:id_event/groups",
  AuthMiddleware.validateToken,
  GroupsController.addGroup,
);
router.put(
  "/events/:id_event/groups/:id",
  AuthMiddleware.validateToken,
  GroupsController.updateGroup,
);
router.delete(
  "/events/:id_event/groups/:id",
  AuthMiddleware.validateToken,
  GroupsController.removeGroup,
);

// Rotas Pessoas
router.get(
  "/events/:id_event/groups/:id_group/people",
  AuthMiddleware.validateToken,
  PeopleController.getAll,
);

export default router;
