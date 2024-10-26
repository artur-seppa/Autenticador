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

export class FinancesController {
  async search(req: Request, res: Response) {
    const { userId } = req.body;

    const financas = await prisma.financas.findMany({
      where: {
        userId: Number(userId), // Filtra as finanças pelo userId
      },
    });

    // Calcula o total com base nos tipos 'ENTRADA' e 'SAIDA'
    const totalEntrada = financas
      .filter((financa) => financa.categoria === "entrada")
      .reduce((sum, financa) => sum + parseFloat(financa.valor.toFixed(2)), 0);

    const totalSaida = financas
      .filter((financa) => financa.categoria === "saida")
      .reduce((sum, financa) => sum + parseFloat(financa.valor.toFixed(2)), 0);

    const total = totalEntrada - totalSaida; // Total = ENTRADA - SAIDA

    return res.json({ total, totalEntrada, totalSaida, financas });
  }

  async store(req: Request, res: Response) {
    const { descricao, categoria, valor, tipo, created_at, userId } = req.body;

    const financa = await prisma.financas.create({
      data: {
        descricao,
        categoria,
        valor,
        tipo,
        created_at,
        userId,
      },
    });

    // retorna o usuario criado no banco
    return res.json({ financa });
  }
}