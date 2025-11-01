import express from "express";
import * as ReproduccionController from "../controllers/reproduccionController.js";

const router = express.Router();

router.get("/reproduccion", ReproduccionController.getAllReproduccion);
router.get("/reproduccion/:id", ReproduccionController.getReproduccionById);
router.post("/reproduccion", ReproduccionController.createReproduccion);
router.put("/reproduccion/:id", ReproduccionController.updateReproduccion);
router.delete("/reproduccion/:id", ReproduccionController.deleteReproduccion);

export default router;
