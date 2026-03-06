import express from "express";
import {
  createCarro,
  getCarros,
  getCarroById,
  updateCarro,
  deleteCarro
} from "../controllers/carroController";

const router = express.Router();

router.post("/", createCarro);
router.get("/", getCarros);
router.get("/:id", getCarroById);
router.put("/:id", updateCarro);
router.delete("/:id", deleteCarro);

export const carroRoutes = router;