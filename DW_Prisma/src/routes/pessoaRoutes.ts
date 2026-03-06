import express from "express";
import {
  createPessoa,
  getPessoas,
  getPessoaById,
  updatePessoa,
  deletePessoa
} from "../controllers/pessoaController";

const router = express.Router();

router.post("/", createPessoa);
router.get("/", getPessoas);
router.get("/:id", getPessoaById);
router.put("/:id", updatePessoa);
router.delete("/:id", deletePessoa);

export const pessoaRoutes = router;