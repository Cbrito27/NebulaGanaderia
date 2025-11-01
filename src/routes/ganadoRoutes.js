import express from "express";
import {
  obtenerGanadoController,
  obtenerGanadoPorIdController,
  crearGanadoController,
  actualizarGanadoController,
} from "../controllers/ganadoController.js";

const router = express.Router();

router.get("/ganados", obtenerGanadoController);
router.get("/ganado/:id", obtenerGanadoPorIdController);
router.post("/ganado", crearGanadoController);
router.put("/ganado/:id", actualizarGanadoController);

export default router;
