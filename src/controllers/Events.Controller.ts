import { Request, RequestHandler, Response } from "express";
import * as eventsService from "@/services/Events.Service";

export const getAll: RequestHandler = async (req: Request, res: Response) => {
  const items = await eventsService.getAll();

  if (items) return res.json({ events: items });

  return res.json({ error: "Ocorreu um erro" });
};
