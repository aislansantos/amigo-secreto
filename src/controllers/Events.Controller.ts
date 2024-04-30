import { Request, RequestHandler, Response } from "express";
import * as EventsService from "@/services/Events.Service";
import * as PeopleService from "@/services/People.Service";
import { z } from "zod";

export const getAll: RequestHandler = async (req: Request, res: Response) => {
  const items = await EventsService.getAll();

  if (items) return res.json({ events: items });

  return res.json({ error: "Ocorreu um erro" });
};

export const getEvent: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await EventsService.getEvent(parseInt(id));

  if (item) return res.json({ event: item });

  return res.json({ error: "Ocorreu um erro" });
};

export const addEvent: RequestHandler = async (req: Request, res: Response) => {
  const addEventSchema = z.object({
    title: z.string(),
    description: z.string(),
    grouped: z.boolean(),
  });
  const body = addEventSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: "Dados inválidos" });

  const newEvent = await EventsService.addEvent(body.data);
  if (newEvent) return res.status(201).json({ event: newEvent });

  return res.json({ error: "Ocorreu um erro" });
};

export const updateEvent: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const updateEventsSchema = z.object({
    status: z.boolean().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    grouped: z.boolean().optional(),
  });

  const body = updateEventsSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: "Dados inválidos" });

  const updatedEvent = await EventsService.updateEvent(parseInt(id), body.data);
  if (updatedEvent) {
    if (updatedEvent.status) {
      // TODO status doMatches
      const result = await EventsService.doMatches(parseInt(id));
      if (!result) return res.json({ error: "Grupos impossivel de sortear" });
    } else {
      await PeopleService.updatePerson(
        { id_event: parseInt(id) },
        { matched: "" },
      );
    }

    return res.json({ event: updatedEvent });
  }

  return res.json({ error: "Ocorreu um erro" });
};

export const removeEvent: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;

  const removedEvent = await EventsService.removeEvent(parseInt(id));
  if (removedEvent) return res.json({ event: removedEvent });

  return res.json({ error: "Ocorreu um erro" });
};
