import react, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { LayoutComponents } from "../../components/LayoutComponents";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2/dist/sweetalert2.js";

export const Login = () => {
  const Swal = require("sweetalert2");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signed, signIn } = useContext(AuthContext);

  /*
    o handleSignIn acessa o metodo singIn do context
    de autenticacao para realizar a autenticacao no sistema.
    
    Se estiver logado entao ele vai ser redirecionado
    para a page Home da nossa aplicacao, se nao,
    ele fica na page de login.
 */

  const handleSignIn = async (e) => {
    // nao permite o recarregamento da pagina
    e.preventDefault();

    if (email == "" || password == "") {
      Swal.fire({
        title: "Atenção!",
        text: "Por favor, preencher todos os campos",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      const data = {
        email,
        password,
      };

      await signIn(data);
    }
  };

  if (signed) {
    return <Navigate to={"/home"} />;
  } else {
    return (
      <LayoutComponents>
        <form onSubmit={handleSignIn} className="login-from">
          <span className="login-from-title">Login</span>

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
              className={password !== "" ? "has-value input" : "input"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="focus-input" data-placeholder="Password"></span>
          </div>

          <div className="container-login-form-btn">
            <button type="submit" className="login-form-btn">
              login
            </button>
          </div>

          <div className="text-center">
            <span className="txt1">Não possui conta?</span>
            <Link className="txt2" to="/register">
              Criar conta.
            </Link>
          </div>
        </form>
      </LayoutComponents>
    );
  }
};
