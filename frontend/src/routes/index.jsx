import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import { PrivateRoute } from "./privateRoutes";

/*
    Router -> define o componente rota
    Routes -> define que nao pode ser chamada mais 
    de uma rota uma vez
    Route -> objeto de rota da aplicacao. Usa como elementos:
        - path: caminho para chamar a rota
        - element: o componente(page) da rota
        - exact: define que so pode chamar essa rota

    Autenticacao -> com o route de PrivateRoute englobando
    a rota, o componente PrivateRoute verifica se o usuario
    esta de fato autenticado no sistema para proseguir.
*/

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/home" element={<PrivateRoute />}>
          <Route path="/home" exact element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};
