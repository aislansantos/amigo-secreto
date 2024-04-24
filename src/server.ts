import "dotenv/config";
import * as express from "express";
import { Request, Response } from "express";
import * as cors from "cors";
import * as path from "path";
// import * as https from "https";
import * as http from "http";
// import * as Routes from "@/routes/router";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));

// app.use(Routes);

app.use((req: Request, res: Response) => {
  res.status(404);
  res.json({ error: "Endpoint não encontrado." });
});

const runServer = (port: number, server: http.Server) => {
  server.listen(port, () => {
    console.log(`🚀 Running at PORT ${port}`);
  });
};

const regularServer = http.createServer(app);

if (process.env.NODE_ENV === "production") {
  // TODO Configurar SSL
  // TODO Rodar server na 80 e na 443
} else {
  const serverPort: number = process.env.PORT
    ? parseInt(process.env.PORT)
    : 9000;
  runServer(serverPort, regularServer);
}
