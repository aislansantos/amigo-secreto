import { Request, RequestHandler, Response } from "express";
import * as eventsService from "@/services/Events.Service";
import { z } from "zod";

export const getAll: RequestHandler = async (req: Request, res: Response) => {
  const items = await eventsService.getAll();

  if (items) return res.json({ events: items });

  return res.json({ error: "Ocorreu um erro" });
};

export const getEvent: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await eventsService.getEvent(parseInt(id));

  if (item) return res.json({ event: item });

  return res.json({ error: "Ocorreu um erro" });
};

export const addEvent = async (req: Request, res: Response) => {
  const addEventSchema = z.object({
    title: z.string(),
    description: z.string(),
    grouped: z.boolean(),
  });
  const body = addEventSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: "Dados inválidos" });

  const newEvent = await eventsService.addEvent(body.data);
  if (newEvent) return res.status(201).json({ event: newEvent });

  return res.json({ error: "Ocorreu um erro" });
};
