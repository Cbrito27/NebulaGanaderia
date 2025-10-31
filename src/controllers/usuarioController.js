import { 
  obtenerUsuarios, 
  crearUsuario, 
  cambioContrasena 
} from "../services/usuarioService.js";

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await obtenerUsuarios();
    res.status(200).send(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 500, mensaje: "Error al obtener los usuarios" });
  }
};

export const crearUsuarioController = async (req, res) => {
  try {
    const resp = await crearUsuario(req.body);

    if (resp === "400") {
      return res.status(400).send({ error: 400, mensaje: "Este correo ya está registrado" });
    }

    res.status(200).send(resp);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 500, mensaje: "Error interno del servidor" });
  }
};

export const cambioContrasenaController = async (req, res) => {
  try {
    const resp = await cambioContrasena(req.body);
    res.status(200).send({ mensaje: resp });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 500, mensaje: "Error al cambiar la contraseña" });
  }
};
