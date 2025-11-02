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

// ✅ Crear alimentación
export async function crearAlimentacion(data) {
  const {
    tipo_alimento,
    cantidad,
    fecha_suministro,
    observaciones,
    ganado_cod_ganado
  } = data;

  const pool = await connectToDatabase();
  const result = await pool
    .request()
    .input("tipo_alimento", sql.NVarChar(100), tipo_alimento)
    .input("cantidad", sql.Decimal(10, 2), cantidad)
    .input("fecha_suministro", sql.Date, fecha_suministro)
    .input("observaciones", sql.NVarChar(255), observaciones || null)
    .input("ganado_cod_ganado", sql.Int, ganado_cod_ganado)
    .query(`
      INSERT INTO [ganaderia].[alimentacion]
      (tipo_alimento, cantidad, fecha_suministro, observaciones, ganado_cod_ganado)
      VALUES (@tipo_alimento, @cantidad, @fecha_suministro, @observaciones, @ganado_cod_ganado);
    `);

  return result.rowsAffected[0] > 0;
}

// ✅ Editar alimentación
export async function editarAlimentacion(id, data) {
  const {
    tipo_alimento,
    cantidad,
    fecha_suministro,
    observaciones,
    ganado_cod_ganado
  } = data;

  const pool = await connectToDatabase();
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .input("tipo_alimento", sql.NVarChar(100), tipo_alimento)
    .input("cantidad", sql.Decimal(10, 2), cantidad)
    .input("fecha_suministro", sql.Date, fecha_suministro)
    .input("observaciones", sql.NVarChar(255), observaciones || null)
    .input("ganado_cod_ganado", sql.Int, ganado_cod_ganado)
    .query(`
      UPDATE [ganaderia].[alimentacion]
      SET tipo_alimento = @tipo_alimento,
          cantidad = @cantidad,
          fecha_suministro = @fecha_suministro,
          observaciones = @observaciones,
          ganado_cod_ganado = @ganado_cod_ganado
      WHERE cod_alimen = @id;
    `);

  return result.rowsAffected[0] > 0;
}
