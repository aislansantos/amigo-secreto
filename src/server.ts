import "dotenv/config";
import * as express from "express";
import { Request, Response } from "express";
import * as cors from "cors";
import * as path from "path";
// import * as https from "https";
import * as http from "http";
import adminRoutes from "@/routes/admin";
import siteRoutes from "@/routes/site";
import { requestIntercepter } from "@/utils/requestIntercepter";

const app = express();

app.use(cors());
// Middleware para processar JSON e URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve arquivos estaticos na pasta public HTML, CSS por exemplo
app.use(express.static(path.join(__dirname, "../public")));

app.use("*", requestIntercepter);

app.use("/admin", adminRoutes);
app.use("/", siteRoutes);

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

// Verificar ambiente e iniciar o servidor
if (process.env.NODE_ENV === "production") {
  // TODO Configurar SSL
  // TODO Rodar server na 80 e na 443
} else {
  const serverPort: number = process.env.PORT
    ? parseInt(process.env.PORT)
    : 9000;
  runServer(serverPort, regularServer);
}
