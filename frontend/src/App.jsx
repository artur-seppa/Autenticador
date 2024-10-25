import react from "react";
import { AppRouter } from "./routes";
import "./assets/global.css";
import { AuthProvider } from "./context/AuthContext";

/*
  O css global eh passado a todas as rotas 
  definidas

  o AuthProvider engloba toda a nossa aplicacao,
  englobando todos os componentes. Dessa forma, 
  podemos obter os valores fornecidos pelo context
  e tambem executar a funcao que verifica a autenticacao
  em todo lugar.
*/

export const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};
