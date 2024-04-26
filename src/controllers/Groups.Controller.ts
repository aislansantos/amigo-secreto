import { Request, Response, RequestHandler } from "express";
import * as GroupsService from "@/services/Groups.Service";
import { z } from "zod";

export const getAll: RequestHandler = async (req: Request, res: Response) => {
  const { id_event } = req.params;
  const groups = await GroupsService.getAll(parseInt(id_event));
  if (groups) return res.json({ event: parseInt(id_event), groups });

  return res.json({ error: "Ocorreu um erro" });
};

export const getGroup: RequestHandler = async (req: Request, res: Response) => {
  const { id_event, id } = req.params;
  const group = await GroupsService.getGroup({
    id: parseInt(id),
    id_event: parseInt(id_event),
  });
  if (group) return res.json({ groupItem: group });

  return res.json({ error: "Ocorreu um erro" });
};

export const addGroup: RequestHandler = async (req: Request, res: Response) => {
  const { id_event } = req.params;

  const addGroupSchema = z.object({
    name: z.string(),
  });
  const body = addGroupSchema.safeParse(req.body);

  if (!body.success) return res.json({ error: "Dados inválidos" });

  const newGroup = await GroupsService.addGroup({
    name: body.data.name,
    id_event: parseInt(id_event),
  });

  if (newGroup) return res.status(201).json({ group: newGroup });

  return res.json({ error: "Ocorreu um erro" });
};

export const updateGroup: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const { id_event, id } = req.params;
  const updateGroupSchema = z.object({
    name: z.string().optional(),
  });

  const body = updateGroupSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: "Dados inválidos" });

  const updatedGroup = await GroupsService.updateGroup(
    {
      id: parseInt(id),
      id_event: parseInt(id_event),
    },
    body.data,
  );
  if (updatedGroup) return res.json({ group: updatedGroup });

  return res.json({ error: "Ocorreu um erro" });
};

export const removeGroup: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const { id_event, id } = req.params;

  const removedGroup = await GroupsService.removeGroup({
    id: parseInt(id),
    id_event: parseInt(id_event),
  });
  if (removedGroup) return res.json({ group: removedGroup });

  return res.json({ error: "Ocorreu um erro" });
};
