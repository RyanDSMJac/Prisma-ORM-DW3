import express from "express";
import {
  createTelefone,
  getTelefones,
  getTelefoneById,
  updateTelefone,
  deleteTelefone
} from "../controllers/telefoneController";

const router = express.Router();

router.post("/", createTelefone);
router.get("/", getTelefones);
router.get("/:id", getTelefoneById);
router.put("/:id", updateTelefone);
router.delete("/:id", deleteTelefone);

export const telefoneRoutes = router;