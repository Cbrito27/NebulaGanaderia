import { connectToDatabase, sql } from "../database/database-config.js";

export async function obtenerAlimentaciones() {
  const pool = await connectToDatabase();
  const result = await pool
    .request()
    .query("SELECT * FROM [ganaderia].[alimentacion]");
  return result.recordset;
}

export async function obtenerAlimentacionPorId(id) {
  const pool = await connectToDatabase();
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query("SELECT * FROM [ganaderia].[alimentacion] WHERE cod_alimen = @id");
  return result.recordset[0];
}
