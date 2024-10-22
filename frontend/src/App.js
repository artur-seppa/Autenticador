import './styles.css'

function App() {
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
              <input className='input' type="email" />
              <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input">
              <input className='input' type="password" />
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
