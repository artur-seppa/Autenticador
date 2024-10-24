import { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutComponents } from "../../components/LayoutComponents";
import { api } from "../../services/api";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  /*
    Lida com o armazenamento de cadastro do usuario.
    - Eh uma funcao assincrona no qual faz a requisicao
    com a api definida como base no service axios.
    - Passamos como informacao o tipo de metodo (post),
    a rota, e os parametros como body.
  */
  const handleSaveUser = async(e) => {
    // nao permite o recarregamento da pagina
    e.preventDefault();

    const data = {
      email, password, name
    }

    const response = await api.post("/create", data);
    console.log(response.data)
  }

  return (
    <LayoutComponents>
      <form onSubmit={handleSaveUser} className="login-from">
        <span className="login-from-title">Criar Conta</span>

        <span className="login-from-title">logo</span>

        <div className="wrap-input">
          <input
            className={email !== "" ? "has-value input" : "input"}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Email"></span>
        </div>

        <div className="wrap-input">
          <input
            className={name !== "" ? "has-value input" : "input"}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Nome"></span>
        </div>

        <div className="wrap-input">
          <input
            className={password !== "" ? "has-value input" : "input"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Password"></span>
        </div>

        <div className="container-login-form-btn">
          <button type="submit" className="login-form-btn">Cadastrar</button>
        </div>

        <div className="text-center">
          <span className="txt1">Já possui conta?</span>
          <Link className="txt2" to="/">
            Acessar com Email e Senha.
          </Link>
        </div>
      </form>
    </LayoutComponents>
  );
};
