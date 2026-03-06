import "dotenv/config";
import express from "express";
import path from "path";

import { carroRoutes } from "./routes/carroRoutes";
import { pessoaRoutes } from "./routes/pessoaRoutes";
import { pessoaCarroRoutes } from "./routes/pessoaCarroRoutes";
import { telefoneRoutes } from "./routes/telefoneRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views")));

app.use("/carros", carroRoutes);
app.use("/pessoas", pessoaRoutes);
app.use("/associacoes", pessoaCarroRoutes);
app.use("/telefones", telefoneRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});