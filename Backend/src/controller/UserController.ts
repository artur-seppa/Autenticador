import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";

/*
    METODO INDEX - Select no banco com condicional

    METODO STORE - Insert no banco
    - Com o req obtemos os valores de body da requisicao
    - verificamos se ja existe um usuario com este email no banco
    - hash eh uma ferramenta do bcrypt no qual pega
    o valor da senha e a criptografa.
    - Com o prisma user create efetuamos a conexao e 
    a criacao do usuario no banco de dados, passando
    os seus respectivos valores.
*/

export class UserController {
    async index(req: Request, res: Response) {
        const users = await prisma.user.findMany();

        return res.json({users})
    }

    async store(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const userExists = await prisma.user.findUnique({where: {email}})

        if (userExists) {
            return res.json({error: "User already exists"})
        }

        const hash_password = await bcrypt.hash(password, 8);

        const user = await prisma.user.create({
            data: {
                name, email, password: hash_password,
            }
        })

        // retorna o usuario criado no banco
        return res.json({ user });
    }
}