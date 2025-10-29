import express from "express";
import { routesApi } from "./routes/index.js";
import { connectToDatabase } from "./database/database-config.js";

const app = express();
app.use(express.json());

routesApi(app);
connectToDatabase();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
