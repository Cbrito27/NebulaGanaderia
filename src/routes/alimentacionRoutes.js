import { Router } from "express";
import {
  listarAlimentaciones,
  mostrarAlimentacion
} from "../controllers/alimentacionController.js";

const router = Router();

router.get("/alimentacion", listarAlimentaciones);
router.get("/alimetacion/:id", mostrarAlimentacion);

export default router;
