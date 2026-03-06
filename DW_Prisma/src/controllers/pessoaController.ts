import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const createPessoa = async (req: Request, res: Response) => {
  try {
    const { nome } = req.body;
    const pessoa = await prisma.pessoa.create({ data: { nome } });
    res.status(201).json(pessoa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar pessoa" });
  }
};

export const getPessoas = async (_: Request, res: Response) => {
  const pessoas = await prisma.pessoa.findMany();
  res.json(pessoas);
};

export const getPessoaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const pessoa = await prisma.pessoa.findUnique({
    where: { idpessoa: Number(id) }
  });
  res.json(pessoa);
};

export const updatePessoa = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome } = req.body;
  const pessoa = await prisma.pessoa.update({
    where: { idpessoa: Number(id) },
    data: { nome }
  });
  res.json(pessoa);
};

export const deletePessoa = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.pessoa.delete({ where: { idpessoa: Number(id) } });
  res.status(204).send();
};