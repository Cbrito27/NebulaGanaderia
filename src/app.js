import express from "express";
import { routesApi } from "./routes/index.js";
import { connectToDatabase } from "./database/database-config.js";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

routesApi(app);
connectToDatabase();


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
