import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

const apenasNumeros = (str: string) => /^[0-9]+$/.test(str);

export const createTelefone = async (req: Request, res: Response) => {
  try {
    const { numero, idpessoa } = req.body;

    if (!apenasNumeros(numero)) {
      return res.status(400).json({ error: "O número de telefone deve conter apenas algarismos (0-9)." });
    }

    const pessoa = await prisma.pessoa.findUnique({ where: { idpessoa: Number(idpessoa) } });
    if (!pessoa) {
      return res.status(404).json({ error: "Pessoa não encontrada" });
    }

    const telefone = await prisma.telefone.create({
      data: { 
        numero, 
        idpessoa: Number(idpessoa) 
      }
    });
    res.status(201).json(telefone);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar telefone" });
  }
};

export const getTelefones = async (_: Request, res: Response) => {
  try {
    const telefones = await prisma.telefone.findMany({
      include: { pessoa: true }
    });
    res.json(telefones);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar telefones" });
  }
};

export const getTelefoneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const telefone = await prisma.telefone.findUnique({
    where: { idtelefone: Number(id) },
    include: { pessoa: true }
  });
  
  if (!telefone) return res.status(404).json({ error: "Telefone não encontrado" });
  res.json(telefone);
};

export const updateTelefone = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { numero, idpessoa } = req.body;

    const updateData: any = {};
    
    if (numero !== undefined) {
      if (!apenasNumeros(numero)) {
        return res.status(400).json({ error: "O número de telefone deve conter apenas algarismos (0-9)." });
      }
      updateData.numero = numero;
    }

    if (idpessoa !== undefined) updateData.idpessoa = Number(idpessoa);

    const telefone = await prisma.telefone.update({
      where: { idtelefone: Number(id) },
      data: updateData
    });
    
    res.json(telefone);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar telefone" });
  }
};

export const deleteTelefone = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.telefone.delete({ where: { idtelefone: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar telefone" });
  }
};