import express from "express";
import { router } from "./routes";
import cors from "cors"

const app = express();

/* permite o acesso livre da requisicao do backend
   sem precisar definir uma url especifica que a 
   requisita
*/
app.use(cors());
// configura como padrao o recebimento de dados via json
app.use(express.json());
//obtem as rotas definidas
app.use(router);

app.listen(3333, () =>
    console.log("server is running on http://localhost:3333")
);

