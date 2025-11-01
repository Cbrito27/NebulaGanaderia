import { connectToDatabase, sql } from "../database/database-config.js";

// ✅ Obtener todas las producciones
export const getAllProduccion = async () => {
  const pool = await connectToDatabase();
  const result = await pool.request().query(`
    SELECT 
      p.cod_produc,
      p.tipo_produc,
      p.fecha,
      p.cantidad,
      p.unidad,
      e.nombres + ' ' + e.apellidos AS responsable,
      g.id_ganado,
      g.codigo_marcacion,
      g.nombre AS nombre_ganado,
      g.raza
    FROM ganaderia.produccion p
    LEFT JOIN ganaderia.produccion_ganado pg 
      ON p.cod_produc = pg.cod_produc
    LEFT JOIN ganaderia.ganado g 
      ON g.id_ganado = pg.cod_res
    LEFT JOIN ganaderia.empleados e 
      ON p.empleados_responsable = e.cod_empleado
    ORDER BY p.fecha DESC
  `);
  return result.recordset;
};

// ✅ Obtener una producción por ID
export const getProduccionById = async (id) => {
  const pool = await connectToDatabase();
  const result = await pool.request()
    .input("id", sql.Int, id)
    .query(`
      SELECT 
        p.cod_produc,
        p.tipo_produc,
        p.fecha,
        p.cantidad,
        p.unidad,
        e.nombres + ' ' + e.apellidos AS responsable,
        g.id_ganado,
        g.codigo_marcacion,
        g.nombre AS nombre_ganado,
        g.raza,
        g.peso_actual,
        g.estado_salud
      FROM ganaderia.produccion p
      LEFT JOIN ganaderia.produccion_ganado pg 
        ON p.cod_produc = pg.cod_produc
      LEFT JOIN ganaderia.ganado g 
        ON g.id_ganado = pg.cod_res
      LEFT JOIN ganaderia.empleados e 
        ON p.empleados_responsable = e.cod_empleado
      WHERE p.cod_produc = @id
    `);
  return result.recordset[0];
};

// ✅ Crear nueva producción
export const crearProduccion = async (produccion) => {
  const pool = await connectToDatabase();
  const transaction = pool.transaction();
  await transaction.begin();

  try {
    const result = await transaction.request()
      .input("tipo_produc", sql.NVarChar, produccion.tipo_produc)
      .input("fecha", sql.Date, produccion.fecha)
      .input("cantidad", sql.Decimal(10, 2), produccion.cantidad)
      .input("unidad", sql.NVarChar, produccion.unidad)
      .input("empleados_responsable", sql.Int, produccion.empleados_responsable)
      .query(`
        INSERT INTO ganaderia.produccion (tipo_produc, fecha, cantidad, unidad, empleados_responsable)
        VALUES (@tipo_produc, @fecha, @cantidad, @unidad, @empleados_responsable);
        SELECT SCOPE_IDENTITY() AS cod_produc;
      `);

    const cod_produc = result.recordset[0].cod_produc;

    if (produccion.cod_res) {
      await transaction.request()
        .input("cod_produc", sql.Int, cod_produc)
        .input("cod_res", sql.Int, produccion.cod_res)
        .query(`
          INSERT INTO ganaderia.produccion_ganado (cod_produc, cod_res)
          VALUES (@cod_produc, @cod_res);
        `);
    }

    await transaction.commit();
    return { mensaje: "Producción creada exitosamente", cod_produc };
  } catch (error) {
    await transaction.rollback();
    console.error("Error al crear producción:", error);
    throw error;
  }
};

// ✅ Editar producción existente
export const editarProduccion = async (id, produccion) => {
  const pool = await connectToDatabase();
  await pool.request()
    .input("id", sql.Int, id)
    .input("tipo_produc", sql.NVarChar, produccion.tipo_produc)
    .input("fecha", sql.Date, produccion.fecha)
    .input("cantidad", sql.Decimal(10, 2), produccion.cantidad)
    .input("unidad", sql.NVarChar, produccion.unidad)
    .input("empleados_responsable", sql.Int, produccion.empleados_responsable)
    .query(`
      UPDATE ganaderia.produccion
      SET tipo_produc = @tipo_produc,
          fecha = @fecha,
          cantidad = @cantidad,
          unidad = @unidad,
          empleados_responsable = @empleados_responsable
      WHERE cod_produc = @id;
    `);

  return { mensaje: "Producción actualizada exitosamente" };
};
