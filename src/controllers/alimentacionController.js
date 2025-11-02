import {
  obtenerAlimentaciones,
  obtenerAlimentacionPorId,
  crearAlimentacion,
  editarAlimentacion
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

// ✅ Crear
export async function crearAlimentacionController(req, res) {
  try {
    const creado = await crearAlimentacion(req.body);
    if (!creado)
      return res.status(400).json({ mensaje: "No se pudo crear el registro" });

    res.status(201).json({ mensaje: "Alimentación creada correctamente" });
  } catch (error) {
    console.error("❌ Error al crear alimentación:", error);
    res.status(500).json({ mensaje: "Error al crear el registro" });
  }
}

// ✅ Editar
export async function editarAlimentacionController(req, res) {
  try {
    const { id } = req.params;
    const editado = await editarAlimentacion(id, req.body);

    if (!editado)
      return res.status(404).json({ mensaje: "Registro no encontrado o sin cambios" });

    res.json({ mensaje: "Alimentación actualizada correctamente" });
  } catch (error) {
    console.error("❌ Error al editar alimentación:", error);
    res.status(500).json({ mensaje: "Error al editar el registro" });
  }
}
