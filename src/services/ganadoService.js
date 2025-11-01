import { connectToDatabase, sql } from "../database/database-config.js";

// Obtener todos los registros de ganado
export const obtenerGanado = async () => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query(`
      SELECT id_ganado, codigo_marcacion, nombre, raza, sexo, fecha_naci, 
             estado_salud, estado_repro, peso_actual, origen, ventas_cod_venta, raza_id_raza
      FROM ganaderia.ganado
    `);
    return result.recordset;
  } catch (error) {
    console.error("❌ Error al obtener ganado:", error);
    throw error;
  }
};

// Obtener ganado por ID
export const obtenerGanadoPorId = async (id_ganado) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .input("id_ganado", sql.Int, id_ganado)
      .query(`
        SELECT id_ganado, codigo_marcacion, nombre, raza, sexo, fecha_naci, 
               estado_salud, estado_repro, peso_actual, origen, ventas_cod_venta, raza_id_raza
        FROM ganaderia.ganado
        WHERE id_ganado = @id_ganado
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("❌ Error al obtener ganado por ID:", error);
    throw error;
  }
};

// Crear un nuevo registro de ganado
export const crearGanado = async (ganado) => {
  try {
    const {
      codigo_marcacion,
      nombre,
      raza,
      sexo,
      fecha_naci,
      estado_salud,
      estado_repro,
      peso_actual,
      origen,
      ventas_cod_venta,
      raza_id_raza,
    } = ganado;

    const pool = await connectToDatabase();
    await pool
      .request()
      .input("codigo_marcacion", sql.NVarChar(20), codigo_marcacion)
      .input("nombre", sql.NVarChar(30), nombre)
      .input("raza", sql.NVarChar(20), raza)
      .input("sexo", sql.NVarChar(6), sexo)
      .input("fecha_naci", sql.Date, fecha_naci)
      .input("estado_salud", sql.NVarChar(30), estado_salud)
      .input("estado_repro", sql.NVarChar(30), estado_repro)
      .input("peso_actual", sql.Decimal(8, 2), peso_actual)
      .input("origen", sql.NVarChar(50), origen)
      .input("ventas_cod_venta", sql.Int, ventas_cod_venta)
      .input("raza_id_raza", sql.Int, raza_id_raza)
      .query(`
        INSERT INTO ganaderia.ganado 
        (codigo_marcacion, nombre, raza, sexo, fecha_naci, estado_salud, estado_repro, peso_actual, origen, ventas_cod_venta, raza_id_raza)
        VALUES (@codigo_marcacion, @nombre, @raza, @sexo, @fecha_naci, @estado_salud, @estado_repro, @peso_actual, @origen, @ventas_cod_venta, @raza_id_raza)
      `);

    return { message: "✅ Ganado creado correctamente" };
  } catch (error) {
    console.error("❌ Error al crear ganado:", error);
    throw error;
  }
};

// Actualizar un registro existente
export const actualizarGanado = async (id_ganado, datos) => {
  try {
    const pool = await connectToDatabase();
    await pool
      .request()
      .input("id_ganado", sql.Int, id_ganado)
      .input("nombre", sql.NVarChar(30), datos.nombre)
      .input("raza", sql.NVarChar(20), datos.raza)
      .input("sexo", sql.NVarChar(6), datos.sexo)
      .input("fecha_naci", sql.Date, datos.fecha_naci)
      .input("estado_salud", sql.NVarChar(30), datos.estado_salud)
      .input("estado_repro", sql.NVarChar(30), datos.estado_repro)
      .input("peso_actual", sql.Decimal(8, 2), datos.peso_actual)
      .input("origen", sql.NVarChar(50), datos.origen)
      .query(`
        UPDATE ganaderia.ganado 
        SET nombre = @nombre,
            raza = @raza,
            sexo = @sexo,
            fecha_naci = @fecha_naci,
            estado_salud = @estado_salud,
            estado_repro = @estado_repro,
            peso_actual = @peso_actual,
            origen = @origen
        WHERE id_ganado = @id_ganado
      `);

    return { message: "✅ Ganado actualizado correctamente" };
  } catch (error) {
    console.error("❌ Error al actualizar ganado:", error);
    throw error;
  }
};
