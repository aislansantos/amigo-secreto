import { Router } from "express";
import { Request, Response } from "express";
import * as EventsController from "@/controllers/Events.Controller";
import * as PeopleController from "@/controllers/People.Controller";

const router = Router();

router.get("/ping", (req: Request, res: Response) => {
  res.json({ pong: true });
});

router.get("/events/:id", EventsController.getEvent);
router.get("/events/:id_event/search", PeopleController.searchPerson);

export default router;
