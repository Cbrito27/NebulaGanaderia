import { connectToDatabase, sql } from "../database/database-config.js";


// Obtener todas las reproducciones
export const getAllReproduccion = async () => {
  const pool = await connectToDatabase();
  const result = await pool.request().query(`
    SELECT 
      r.cod_evento,
      r.fecha_evento,
      r.observaciones,
      t.nombre_evento AS tipo_evento,

      -- Datos del macho
      p.cod_res_macho,
      gm.codigo_marcacion AS codigo_macho,
      gm.nombre AS nombre_macho,
      gm.raza AS raza_macho,
      gm.sexo AS sexo_macho,

      -- Datos de la hembra
      p.cod_res_hembra,
      gh.codigo_marcacion AS codigo_hembra,
      gh.nombre AS nombre_hembra,
      gh.raza AS raza_hembra,
      gh.sexo AS sexo_hembra

    FROM ganaderia.reproduccion r
    INNER JOIN ganaderia.tipo_evento t 
      ON r.tipo_evento_idtipo_evento = t.idtipo_evento
    LEFT JOIN ganaderia.pareja_reproductiva p 
      ON p.cod_evento = r.cod_evento
    LEFT JOIN ganaderia.ganado gm 
      ON gm.id_ganado = p.cod_res_macho
    LEFT JOIN ganaderia.ganado gh 
      ON gh.id_ganado = p.cod_res_hembra
    ORDER BY r.fecha_evento DESC
  `);
  return result.recordset;
};

// Obtener una reproducción por ID
export const getReproduccionById = async (id) => {
  const pool = await connectToDatabase();
  const result = await pool.request()
    .input("id", sql.Int, id)
    .query(`
      SELECT 
        r.cod_evento,
        r.fecha_evento,
        r.observaciones,
        t.nombre_evento AS tipo_evento,

        -- Datos del macho
        p.cod_res_macho,
        gm.codigo_marcacion AS codigo_macho,
        gm.nombre AS nombre_macho,
        gm.raza AS raza_macho,
        gm.sexo AS sexo_macho,
        gm.estado_salud AS salud_macho,
        gm.estado_repro AS estado_repro_macho,

        -- Datos de la hembra
        p.cod_res_hembra,
        gh.codigo_marcacion AS codigo_hembra,
        gh.nombre AS nombre_hembra,
        gh.raza AS raza_hembra,
        gh.sexo AS sexo_hembra,
        gh.estado_salud AS salud_hembra,
        gh.estado_repro AS estado_repro_hembra

      FROM ganaderia.reproduccion r
      INNER JOIN ganaderia.tipo_evento t 
        ON r.tipo_evento_idtipo_evento = t.idtipo_evento
      LEFT JOIN ganaderia.pareja_reproductiva p 
        ON p.cod_evento = r.cod_evento
      LEFT JOIN ganaderia.ganado gm 
        ON gm.id_ganado = p.cod_res_macho
      LEFT JOIN ganaderia.ganado gh 
        ON gh.id_ganado = p.cod_res_hembra
      WHERE r.cod_evento = @id
    `);
  return result.recordset[0];
};


export const createReproduccion = async (data) => {
  const { fecha_evento, observaciones, tipo_evento_idtipo_evento, cod_res_macho, cod_res_hembra } = data;
  const pool = await connectToDatabase();

  const transaction = new sql.Transaction(pool);
  await transaction.begin();

  try {
    const request = new sql.Request(transaction);
    const insertReproduccion = await request
      .input("fecha_evento", sql.Date, fecha_evento)
      .input("observaciones", sql.NVarChar(150), observaciones)
      .input("tipo_evento_idtipo_evento", sql.Int, tipo_evento_idtipo_evento)
      .query(`
        INSERT INTO ganaderia.reproduccion (fecha_evento, observaciones, tipo_evento_idtipo_evento)
        VALUES (@fecha_evento, @observaciones, @tipo_evento_idtipo_evento);
        SELECT SCOPE_IDENTITY() AS cod_evento;
      `);

    const cod_evento = insertReproduccion.recordset[0].cod_evento;

    await request
      .input("cod_evento", sql.Int, cod_evento)
      .input("cod_res_macho", sql.Int, cod_res_macho)
      .input("cod_res_hembra", sql.Int, cod_res_hembra)
      .query(`
        INSERT INTO ganaderia.pareja_reproductiva (cod_evento, cod_res_macho, cod_res_hembra)
        VALUES (@cod_evento, @cod_res_macho, @cod_res_hembra);
      `);

    await transaction.commit();
    return { message: "Evento de reproducción registrado correctamente", cod_evento };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const updateReproduccion = async (id, data) => {
  const { fecha_evento, observaciones, tipo_evento_idtipo_evento } = data;
  const pool = await connectToDatabase();
  await pool.request()
    .input("id", sql.Int, id)
    .input("fecha_evento", sql.Date, fecha_evento)
    .input("observaciones", sql.NVarChar(150), observaciones)
    .input("tipo_evento_idtipo_evento", sql.Int, tipo_evento_idtipo_evento)
    .query(`
      UPDATE ganaderia.reproduccion
      SET fecha_evento = @fecha_evento,
          observaciones = @observaciones,
          tipo_evento_idtipo_evento = @tipo_evento_idtipo_evento
      WHERE cod_evento = @id
    `);
  return { message: "Evento de reproducción actualizado correctamente" };
};

export const deleteReproduccion = async (id) => {
  const pool = await connectToDatabase();
  await pool.request()
    .input("id", sql.Int, id)
    .query(`
      DELETE FROM ganaderia.pareja_reproductiva WHERE cod_evento = @id;
      DELETE FROM ganaderia.reproduccion WHERE cod_evento = @id;
    `);
  return { message: "Evento de reproducción eliminado correctamente" };
};
