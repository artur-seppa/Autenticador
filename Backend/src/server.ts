import express from "express";
import { router } from "./routes";

const app = express();

// configura como padrao o recebimento de dados via json
app.use(express.json());
//obtem as rotas definidas
app.use(router);

app.listen(3333, () => 
    console.log("server is running on http://localhost:3333")
);

