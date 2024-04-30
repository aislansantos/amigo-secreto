import { Request, Response, RequestHandler } from "express";
import * as PeopleService from "@/services/People.Service";
import { z } from "zod";
import { decryptMatch } from "@/utils/match";

export const getAll: RequestHandler = async (req: Request, res: Response) => {
  const { id_event, id_group } = req.params;

  const people = await PeopleService.getAll({
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  });
  if (people) return res.json({ people });

  return res.json({ error: "Ocorreu um erro" });
};

export const getPerson: RequestHandler = async (req: Request, res: Response) => {
  const { id_event, id_group, id } = req.params;

  const person = await PeopleService.getPerson({
    id: parseInt(id),
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  });

  if (person) return res.json({ person });

  return res.json({ error: "Ocorreu um erro" });
};

export const addPerson: RequestHandler = async (req: Request, res: Response) => {
  const { id_group, id_event } = req.params;

  const addPersonSchema = z.object({
    name: z.string(),
    cpf: z.string().transform((val) => val.replace(/\.|-/gm, "")),
  });

  const body = addPersonSchema.safeParse(req.body);

  if (!body.success) return res.json({ error: "Dados inválidos" });

  const newPerson = await PeopleService.addPerson({
    name: body.data.name,
    cpf: body.data.cpf,
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  });

  if (newPerson) return res.status(201).json({ person: newPerson });

  return res.json({ error: "Ocorreu um erro" });
};

export const updatePerson: RequestHandler = async (req: Request, res: Response) => {
  const { id_event, id_group, id } = req.params;
  const updatePersonSchema = z.object({
    name: z.string().optional(),
    cpf: z
      .string()
      .transform((val) => val.replace(/\.|-/gm, ""))
      .optional(),
    matched: z.string().optional(),
  });

  const body = updatePersonSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: "Dados inválidos" });

  const updatedPerson = await PeopleService.updatePerson(
    {
      id: parseInt(id),
      id_group: parseInt(id_group),
      id_event: parseInt(id_event),
    },
    body.data,
  );

  if (updatedPerson) {
    const person = await PeopleService.getPerson({
      id: parseInt(id),
      id_event: parseInt(id_event),
    });

    return res.json({ person });
  }

  return res.json({ error: "Ocorreu um erro" });
};

export const removePerson: RequestHandler = async (req: Request, res: Response) => {
  const { id, id_group, id_event } = req.params;
  const removedPerson = PeopleService.removePerson({
    id: parseInt(id),
    id_group: parseInt(id_group),
    id_event: parseInt(id_event),
  });

  if (removedPerson) return res.json({ person: removedPerson });

  return res.json({ error: "Ocorreu um erro" });
};

export const searchPerson: RequestHandler = async (req: Request, res: Response) => {
  const { id_event } = req.params;

  const searchPersonSchema = z.object({
    cpf: z.string().transform((val) => val.replace(/\.|-/gm, "")),
  });

  const query = searchPersonSchema.safeParse(req.query);

  if (!query.success) return res.json({ error: "Dados inválidos" });

  const personItem = await PeopleService.getPerson({
    id_event: parseInt(id_event),
    cpf: query.data.cpf,
  });

  if (personItem && personItem.matched) {
    const matchId = decryptMatch(personItem.matched);

    const personMatched = await PeopleService.getPerson({
      id_event: parseInt(id_event),
      id: matchId,
    });

    if (personMatched) {
      return res.json({
        person: {
          id: personItem.id,
          name: personItem.name,
        },
        personMatched: {
          id: personMatched.id,
          name: personMatched.name,
        },
      });
    }
  }

  return res.json({ error: "Ocorreu um erro" });
};
