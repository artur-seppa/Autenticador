import "./styles.css"

/*
    Com o props children definimos
    que o conteudo alocado dentro dele
    no local que ele for requisitado
    deve ser renderizado dentro do componente.
*/

export const LayoutComponents = (props) => {
  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
            {props.children}
        </div>
      </div>
    </div>
  );
};
