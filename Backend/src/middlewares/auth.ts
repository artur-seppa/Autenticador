import { NextFunction, Request, Response } from "express";
import { verify, JwtPayload, TokenExpiredError } from "jsonwebtoken"; // Adicione TokenExpiredError aqui

/*
    TokenPayload define as tipagens padroes para o 
    typescript.

    AuthMiddlware
    1) obtem o header do pag do usuario, como authorization
    2) se authorization estiver vazia ja exibe erro
    3) split -> separa o valor de token do resto do header
    4) Ferramenta JSW verify -> verifica se o token passado
    atende com o hash padrao de criacao de token (secret).
    5) decode eh associado as tipagens TokenPayload, no qual
    obtem dele o valor de id do usuario que ta validando o 
    token 
    6) define o userId do usuario com seu valor de id 
    do banco e next() -> aprova a autenticacao do usuario
    e permite seguir.
*/

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export function AuthMiddlware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authorization?.split(" ");

  try {
    const decode = verify(token, "secret") as JwtPayload;
    const { id } = decode as TokenPayload;

    req.userId = id;
    next(); // Continua para o próximo handler/controller
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ error: "Token expired" });
    }

    return res.status(401).json({ error: "Token invalid" });
  }
}
