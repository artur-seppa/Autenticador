import react from "react";
import { AppRouter } from "./routes";
import "./assets/global.css"

/*
  O css global eh passado a todas as rotas 
  definidas
*/

export const App = () => {
  return <AppRouter />;
};
