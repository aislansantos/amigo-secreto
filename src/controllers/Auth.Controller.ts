import { RequestHandler, Request, Response } from "express";
import { z } from "zod";
import * as AuthService from "@/services/Auth.Service";

export const login: RequestHandler = (req: Request, res: Response) => {
  // Esquema de validação de dados
  const loginSchema = z.object({
    password: z.string(),
  });
  // Usa o esquema pra validar os tipos de dados da senha
  const body = loginSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: "Dados inválidos" });

  // Se não validar a senha retorna erro
  if (!AuthService.validatePassword(body.data.password)) {
    return res.status(403).json({ error: "Acesso negado" });
  }

  // Se dvalidar a senha retorna o token de acesso
  res.json({
    token: AuthService.createToken(),
  });
};
