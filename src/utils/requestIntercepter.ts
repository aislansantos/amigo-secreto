import { Request, Response, NextFunction, RequestHandler } from "express";

export const requestIntercepter: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(
    `↪️ ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`,
  );

  next();
};
