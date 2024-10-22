import react, { useState } from 'react'
import './styles.css'

function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-from">
            <span className="login-from-title">Bem vindo</span>

            <span className="login-from-title">
              logo
            </span>

            <div className="wrap-input">
              <input
                className={email !== "" ? 'has-value input' : 'input'}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)} />
              <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input">
              <input
                className={password !== "" ? 'has-value input' : 'input'}
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)} />
              <span className="focus-input" data-placeholder="Password"></span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn">
                login
              </button>
            </div>

            <div className="text-center">
              <span className="txt1">Não possui conta?</span>
              <a className="txt2" href="#">Criar Conta.</a>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
