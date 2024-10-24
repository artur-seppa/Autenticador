import "./styles.css";

/*
    Com o props children definimos
    que o conteudo alocado dentro dele
    no local que ele for requisitado
    deve ser renderizado dentro do componente.
*/

export const LayoutComponents = (props, handleSignIn) => {
  return (
    <form onSubmit={handleSignIn} className="login-from">
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
  );
};
