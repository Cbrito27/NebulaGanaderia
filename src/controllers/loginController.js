import { loginServicio } from "../services/loginService.js";

export const loginController = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || correo.trim() === "") {
      return res
        .status(400)
        .json({ error: 400, mensaje: "El correo está vacío" });
    }

    if (!contrasena || contrasena.trim() === "") {
      return res
        .status(400)
        .json({ error: 400, mensaje: "La contraseña está vacía" });
    }

    const resultado = await loginServicio(correo, contrasena);

    if (resultado === "204") {
      console.log(`Intento fallido de login con correo: ${correo}`);
      return res
        .status(404)
        .json({ error: 404, mensaje: "El correo o contraseña no son correctos" });
    }

    console.log(`Usuario ${correo} inició sesión correctamente`);
    return res.status(200).json(resultado);

  } catch (error) {
    console.error("Error en el login:", error);
    return res
      .status(500)
      .json({ error: 500, mensaje: "Error interno al iniciar sesión" });
  }
};
