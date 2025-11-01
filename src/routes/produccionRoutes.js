import { Router } from "express";
import {
  obtenerProducciones,
  obtenerProduccionPorId,
  crearProduccionController,
  editarProduccionController,
} from "../controllers/produccionController.js";

const router = Router();

router.get("/produccion", obtenerProducciones);
router.get("/produccion/:id", obtenerProduccionPorId);
router.post("/produccion", crearProduccionController);
router.put("/produccion/:id", editarProduccionController);

export default router;
