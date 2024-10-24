import { createContext, useState } from "react";
import { api } from "../services/api";

/* 
    cria um contexto global para quem impoe o seu uso
    no componente
*/
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    /*
        Tenta fazer a autenticacao do usuario,
        passando o email e a senha para o middleware do
        backend.

        Se der erro ja retorna o problema associado.
        Se nao, efetua a alocacao da informacao e o token
        do usuario no localStorage. Alem disso, aloca o token
        no header da page.

        Por fim, os componentes (children) sao renderizados 
        tendo como valor props passados o user, o signed como
        uma flag se o user tem valor ou nao e a execucao da funcao
        signIn
    */
    const signIn = async ({ email, password }) => {
        const response = await api.post("/auth",
            { email, password }
        )

        if (response.data.error) {
            alert(response.data.error);
        } else {
            setUser(response.data);

            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${response.data.token}`;
            localStorage.setItem("@auth:token", response.data.token);
            localStorage.setItem("@auth:token", response.data.user);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            signed: !!user,
            signIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}