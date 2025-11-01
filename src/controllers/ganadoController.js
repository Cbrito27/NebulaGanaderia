import {
  obtenerGanado,
  obtenerGanadoPorId,
  crearGanado,
  actualizarGanado,
} from "../services/ganadoService.js";

export const obtenerGanadoController = async (req, res) => {
  try {
    const ganado = await obtenerGanado();
    res.status(200).json(ganado);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el ganado", error });
  }
};

export const obtenerGanadoPorIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const ganado = await obtenerGanadoPorId(id);
    if (!ganado) {
      return res.status(404).json({ message: "Ganado no encontrado" });
    }
    res.status(200).json(ganado);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el ganado por ID", error });
  }
};

export const crearGanadoController = async (req, res) => {
  try {
    const nuevoGanado = await crearGanado(req.body);
    res.status(201).json(nuevoGanado);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el ganado", error });
  }
};

export const actualizarGanadoController = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await actualizarGanado(id, req.body);
    res.status(200).json(actualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el ganado", error });
  }
};
