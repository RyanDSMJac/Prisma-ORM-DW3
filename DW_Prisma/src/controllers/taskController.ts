import { prisma } from "../lib/prisma";
console.log("PRISMA TYPE:", PrismaClient);
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { Request, Response } from "express";

console.log(process.env.DATABASE_URL)

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

console.log("INSTANCIANDO PRISMA...");
const prisma = new PrismaClient({ adapter });
console.log("PRISMA OK!!");

export const getTasks = async (req: Request, res: Response) => {
	try{
		const tasks = await prisma.task.findMany();
		res.json(tasks);
	}	catch(error){
		res.status(500).json({error: "Erro ao coletar tarefas."});
	}
};

export const createTask = async (req: Request, res: Response) => {
	try{
		const {title, description} = req.body;
		if(!title || !description){
			return res.status(400).json({error: "Título e Descrição obrigatórios!!"});
		}
		const newTask = await prisma.task.create({data: {title, description}});
		res.status(201).json(newTask);
	}	catch(error){
		res.status(500).json({error: "Erro ao criar tarefa!"});
	}
};

export const updateTask = async (req: Request, res: Response) => {
	try{
		const {id} = req.params;
		const {title, description} = req.body;

		const updateTask = await prisma.task.update({
		where: {id: Number(id)}, data: {title, description}});
		res.json(updateTask);
	}	catch(error){
		res.status(500).json({error: "Erro ao atualizar tarefa!!"});
	}
};

export const deleteTask = async (req: Request, res: Response) => {
	try{
		const {id} = req.params;
		await prisma.task.delete({where: {id: Number(id)}});
		res.status(204).send();
	}	catch(error){
		res.status(500).json({error: "Erro ao deletar tarefa!!"});
	}
}; 
