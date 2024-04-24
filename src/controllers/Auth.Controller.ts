import { RequestHandler, Request, Response } from "express";
import { z } from "zod";

export const login: RequestHandler = (req: Request, res: Response) => {
  const loginSchema = z.object({
    password: z.string(),
  });
  const body = loginSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: "Dados inválidos" });

  body.data.password;

  // Validar a senha & gerar o token

  // Retorno da requisição
};
