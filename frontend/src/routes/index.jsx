import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

/*
    Router -> define o componente rota
    Routes -> define que nao pode ser chamada mais 
    de uma rota uma vez
    Route -> objeto de rota da aplicacao. Usa como elementos:
        - path: caminho para chamar a rota
        - element: o componente(page) da rota
        - exact: define que so pode chamar essa rota
*/

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
      </Routes>
    </Router>
  );
};
