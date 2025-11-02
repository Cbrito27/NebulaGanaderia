import { Router } from "express";
import {
  listarAlimentaciones,
  mostrarAlimentacion,
  crearAlimentacionController,
  editarAlimentacionController
} from "../controllers/alimentacionController.js";

const router = Router();

router.get("/alimentacion", listarAlimentaciones);
router.get("/alimentacion/:id", mostrarAlimentacion); 
router.post("/alimentacion", crearAlimentacionController);
router.put("/alimentacion/:id", editarAlimentacionController);

export default router;
