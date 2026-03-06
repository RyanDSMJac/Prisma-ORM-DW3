import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const associarPessoaCarro = async (req: Request, res: Response) => {
  try {
    const { idpessoa, idcarro } = req.body;
    const associacao = await prisma.pessoaPorCarro.create({
      data: { idpessoa, idcarro }
    });
    res.status(201).json(associacao);
  } catch (error) {
    res.status(500).json({ error: "Erro ao associar pessoa e carro" });
  }
};

export const listarAssociacoes = async (_: Request, res: Response) => {
  try {
    const associacoes = await prisma.pessoaPorCarro.findMany({
      include: { pessoa: true, carro: true }
    });
    res.json(associacoes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar associações" });
  }
};

export const excluirAssociacao = async (req: Request, res: Response) => {
  try {
    const { idpessoa, idcarro } = req.params;
    await prisma.pessoaPorCarro.delete({
      where: {
        idpessoa_idcarro: {
          idpessoa: Number(idpessoa),
          idcarro: Number(idcarro)
        }
      }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir associação" });
  }
};