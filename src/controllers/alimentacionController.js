import {
  obtenerAlimentaciones,
  obtenerAlimentacionPorId
} from "../services/alimentacionService.js";

export async function listarAlimentaciones(req, res) {
  try {
    const data = await obtenerAlimentaciones();
    res.json(data);
  } catch (error) {
    console.error("❌ Error al listar alimentaciones:", error);
    res.status(500).json({ mensaje: "Error al obtener los registros" });
  }
}

export async function mostrarAlimentacion(req, res) {
  try {
    const { id } = req.params;
    const alimentacion = await obtenerAlimentacionPorId(id);

    if (!alimentacion) {
      return res.status(404).json({ mensaje: "Registro no encontrado" });
    }

    res.json(alimentacion);
  } catch (error) {
    console.error("❌ Error al consultar alimentación:", error);
    res.status(500).json({ mensaje: "Error al consultar el registro" });
  }
}
