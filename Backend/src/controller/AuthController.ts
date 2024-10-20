import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

/*
    METODO AUTHENTICADE
    1) Obtem as informacoes passadas na requisicao
    2) busca se o usuario existe por seu valor de email, a partir
    da busca de um unico retorno de valor pelo findUnique, com a
    condicional where.
    3) Se o usuario nao for encontrado
    4) Com o bcrypt comparamos se o valor da password da requisicao
    atende o valor criptografado da password do banco
    5) Caso o valor nao seja atendido retorna erro
    6) Com a funcao do sign do JWT, devemos passar 3 parametros:
    - um valor de identificacao unica do usuario
    - um hash padrao para o token ser gerado a partir dele
    - o tempo de expiracao do toker (1d = 1 dia)
*/

export class AuthController {
    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            return res.json({ error: "User not found" })
        }

        const isValuePassword = await bcrypt.compare(password, user.password);

        if (!isValuePassword) {
            return res.json({ error: "password invalid" });
        }

        const token = sign({ id: user.id }, "secret", { expiresIn: "1d" })

        return res.json({
            user: {
                id: user.id,
                email: user.email
            },
            token
        })
    }
}