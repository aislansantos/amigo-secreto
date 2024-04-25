import { Request, Response, RequestHandler } from "express";
import * as PeopleService from "@/services/People.Service";

export const getAll: RequestHandler = async (req: Request, res: Response) => {
  console.log(`⚠️`);

  const { id_event, id_group } = req.params;

  const people = await PeopleService.getAll({
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  });
  if (people) return res.json({ people });

  return res.json({ error: "Ocorreu um erro" });
};
