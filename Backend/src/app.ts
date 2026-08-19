import express from "express";
import routes from "./routes";
import "dotenv/config";
import { errorMiddleware } from "./middlewares/error.middleware";
import cors from "cors";
import path from "path";
import fs from "fs";

const app = express();

app.use(cors({
  origin: ["http://localhost:4000", "https://localhost", "http://localhost", "http://127.0.0.1"],
  credentials: true
}));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.get("/", (req, res) => {
  res.send("Bem-vindo!");
});

app.get("/teste", (req, res) => {
  res.json({ mensagem: "ok" });
});

app.use(routes);

app.use(errorMiddleware);

export default app;