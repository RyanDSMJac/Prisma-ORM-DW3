import express from "express";
import {
  associarPessoaCarro,
  listarAssociacoes,
  excluirAssociacao
} from "../controllers/pessoaCarroController";

const router = express.Router();

router.post("/", associarPessoaCarro);
router.get("/", listarAssociacoes);
router.delete("/:idpessoa/:idcarro", excluirAssociacao);

export const pessoaCarroRoutes = router;