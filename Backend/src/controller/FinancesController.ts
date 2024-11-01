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
        userId: userId, // Filtra as finanças pelo userId
      },
    });

    // Calcula o total com base nos tipos 'ENTRADA' e 'SAIDA'
    const totalEntrada = financas
      .filter((financa) => financa.categoria === "entrada")
      .reduce((sum, financa) => sum + parseFloat(financa.valor.toFixed(2)), 0);

    const totalSaida = financas
      .filter((financa) => financa.categoria === "saida")
      .reduce((sum, financa) => sum + parseFloat(financa.valor.toFixed(2)), 0);

    const total = totalEntrada - totalSaida;

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

  async deleteItem(req: Request, res: Response) {
    const { id_financas } = req.body;

    if (!id_financas) {
      return res.status(400).json({ error: "ID do item não fornecido" });
    }

    try {
      const deletedFinanca = await prisma.financas.delete({
        where: { id_financas: id_financas },
      });

      return res
        .status(200)
        .json({ response: "item deletado com sucesso"});
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao deletar o item", details: error });
    }
  }
}
