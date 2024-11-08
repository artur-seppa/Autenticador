import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

/*
    obtem o valor de signed do context de verificacao
    de autenticacao. Signed eh uma flag de true ou false
    para ver se ta logado ou nao

    Se estiver como true entao a rota o manda para o 
    proximo componente, se nao, entao ele redireciona 
    para o componente de rota "/"
*/
export const PrivateRoute = () => {
  const { signed } = useContext(AuthContext);

  return signed ? <Outlet /> : <Navigate to={"/"} />;
};
