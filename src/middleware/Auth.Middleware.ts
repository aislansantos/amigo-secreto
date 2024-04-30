import { Request, Response, RequestHandler, NextFunction } from "express";
import * as AuthService from "@/services/Auth.Service";

export const validateToken: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: "Acesso Negado" });
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!AuthService.validateToken(token)) {
    return res.status(403).json({ error: "Acesso Negado" });
  }
  next();
};
