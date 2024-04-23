import * as express from "express";
import { Request, Response } from "express";
import Person from "@/index";

const app = express();
const person = new Person();

app.get("/", (req: Request, res: Response) => {
  res.send(person.sayMyName());
});

app.listen(3000, () => {
  console.log("Rodando na porta 3000");
});
