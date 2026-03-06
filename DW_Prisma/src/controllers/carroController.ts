import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const createCarro = async (req: Request, res: Response) => {
  try {
    const { modelo } = req.body;
    const carro = await prisma.carro.create({ data: { modelo } });
    res.status(201).json(carro);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar carro" });
  }
};

export const getCarros = async (_: Request, res: Response) => {
  const carros = await prisma.carro.findMany();
  res.json(carros);
};

export const getCarroById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const carro = await prisma.carro.findUnique({
    where: { idcarro: Number(id) }
  });
  res.json(carro);
};

export const updateCarro = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { modelo } = req.body;
  const carro = await prisma.carro.update({
    where: { idcarro: Number(id) },
    data: { modelo }
  });
  res.json(carro);
};

export const deleteCarro = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.carro.delete({ where: { idcarro: Number(id) } });
  res.status(204).send();
};