import { Router } from "express";
import { 
  getUsuarios, 
  crearUsuarioController, 
  cambioContrasenaController 
} from "../controllers/usuarioController.js";

const router = Router();

router.get("/usuarios", getUsuarios);
router.post("/usuario", crearUsuarioController);
router.put("/usuario/cambiar-contrasena", cambioContrasenaController);

export default router;
