import { createContext, useEffect, useState } from "react";
import { api } from "../services/api/api";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

/* 
    cria um contexto global para quem impoe o seu uso
    no componente
*/
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const Swal = require("sweetalert2");

  const [user, setUser] = useState(null);

  /*
    A funcao eh renderizada todas as vezes que o componente for 
    renderizado. Como eh um context que esta no App, entao todas as
    renderizacoes de componentes chamam o useEffect.      
  
    Verifica se a autenticacao ja foi efetuada no sistema.
    Se ja tiver sido feita a auth entao so atualiza o 
    valor no localStorage
  */

  const verifyToken = async () => {
    try {
      return await api.get("/auth/verify");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Token expirado ou inválido:", error.response.data);
      } else {
        console.log("Erro inesperado:", error);
      }

      return false;
    }
  };

  useEffect(() => {
    const loadingStoresData = async () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageUser && storageToken) {
        api.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;

        const response = await verifyToken();

        if (response.status == 200) {
          setUser(storageUser);
        } else {
          signOut();
          Swal.fire({
            title: "Sessão expirada",
            text: "Por favor, faça login novamente.",
            icon: "warning",
            confirmButtonText: "Ok",
          });
        }
      }
    };

    loadingStoresData();
  }, []);

  /*
        Faz a autenticacao do usuario,
        passando o email e a senha para o middleware do
        backend.

        Se der erro ja retorna o problema associado.
        Se nao, efetua a alocacao da informacao e o token
        do usuario no localStorage. Alem disso, aloca o token
        no header da page.

        Por fim, os componentes (children) sao renderizados 
        tendo como valor props passados o user, o signed como
        uma flag se o user tem valor ou nao e o metodo da funcao
        signIn
    */
  const signIn = async ({ email, password }) => {
    const response = await api.post("/auth", { email, password });

    if (response.data.error) {
      Swal.fire({
        title: "Erro!",
        text: response.data.error,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      setUser(response.data);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      localStorage.setItem("@Auth:user", JSON.stringify(response.data.user));
      localStorage.setItem("@Auth:token", response.data.token);
    }
  };

  /*
    Metodo de singOut da aplicacao, no qual remove os 
    valores de usuario na aplicacao e o token dele de 
    acesso.

    Por fim retorna para a rota de login "/"
  */
  const signOut = () => {
    localStorage.removeItem("@Auth: token");
    localStorage.removeItem("@Auth: user");
    setUser(null);
    delete api.defaults.headers.common["Authorization"]; // Remover o cabeçalh

    return <Navigate to="/" />;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
