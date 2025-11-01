import {
  getAllProduccion,
  getProduccionById,
  crearProduccion,
  editarProduccion,
} from "../services/produccionService.js";

// ✅ Obtener todas las producciones
export const obtenerProducciones = async (req, res) => {
  try {
    const producciones = await getAllProduccion();
    return res.status(200).send(producciones);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ mensaje: "Error al obtener las producciones" });
  }
};

// ✅ Obtener producción por ID
export const obtenerProduccionPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const produccion = await getProduccionById(id);
    if (!produccion) {
      return res.status(404).send({ mensaje: "Producción no encontrada" });
    }
    return res.status(200).send(produccion);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ mensaje: "Error al obtener la producción" });
  }
};

// ✅ Crear producción
export const crearProduccionController = async (req, res) => {
  try {
    const nuevaProduccion = await crearProduccion(req.body);
    return res.status(201).send(nuevaProduccion);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ mensaje: "Error al crear la producción" });
  }
};

// ✅ Editar producción
export const editarProduccionController = async (req, res) => {
  try {
    const { id } = req.params;
    const produccionActualizada = await editarProduccion(id, req.body);
    return res.status(200).send(produccionActualizada);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ mensaje: "Error al actualizar la producción" });
  }
};
