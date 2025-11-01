import * as ReproduccionService from "../services/reproduccionService.js";

export const getAllReproduccion = async (req, res) => {
  try {
    const data = await ReproduccionService.getAllReproduccion();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReproduccionById = async (req, res) => {
  try {
    const data = await ReproduccionService.getReproduccionById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createReproduccion = async (req, res) => {
  try {
    const result = await ReproduccionService.createReproduccion(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReproduccion = async (req, res) => {
  try {
    const result = await ReproduccionService.updateReproduccion(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReproduccion = async (req, res) => {
  try {
    const result = await ReproduccionService.deleteReproduccion(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
