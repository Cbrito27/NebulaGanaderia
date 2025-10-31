import { connectToDatabase, sql } from "../database/database-config.js";
import bcrypt from "bcrypt";

// 🧠 Obtener todos los usuarios
export async function obtenerUsuarios() {
  const pool = await connectToDatabase();
  const result = await pool.request()
    .query("SELECT id_usuario, nombre_us, correo, telefono, cod_rol, cod_empleado FROM [ganaderia].[usuario]");
  return result.recordset;
}

// 🔍 Obtener un usuario por ID
export async function obtenerUsuarioPorId(id) {
  const pool = await connectToDatabase();
  const result = await pool.request()
    .input("id", sql.Int, id)
    .query("SELECT * FROM [ganaderia].[usuario] WHERE id_usuario = @id");
  return result.recordset[0];
}

// 🧾 Crear usuario (verifica si el correo ya existe)
export async function crearUsuario(usuario) {
  const pool = await connectToDatabase();

  const existe = await pool.request()
    .input("correo", sql.NVarChar(50), usuario.correo)
    .query("SELECT id_usuario FROM [ganaderia].[usuario] WHERE correo = @correo");

  if (existe.recordset.length > 0) {
    return "400"; // Correo ya registrado
  }

  const hashedPassword = await bcrypt.hash(usuario.contrasena, 10);

  await pool.request()
    .input("nombre_us", sql.NVarChar(20), usuario.nombre_us)
    .input("contrasena", sql.NVarChar(sql.MAX), hashedPassword)
    .input("correo", sql.NVarChar(50), usuario.correo)
    .input("telefono", sql.NVarChar(20), usuario.telefono)
    .input("cod_rol", sql.Int, usuario.cod_rol)
    .input("cod_empleado", sql.Int, usuario.cod_empleado)
    .query(`
      INSERT INTO [ganaderia].[usuario] 
      (nombre_us, contrasena, correo, telefono, cod_rol, cod_empleado)
      VALUES (@nombre_us, @contrasena, @correo, @telefono, @cod_rol, @cod_empleado)
    `);

  return { mensaje: "Usuario creado exitosamente" };
}

// 🔐 Cambio de contraseña
export async function cambioContrasena(datos) {
  const pool = await connectToDatabase();

  const result = await pool.request()
    .input("correo", sql.NVarChar(50), datos.correo)
    .query("SELECT contrasena FROM [ganaderia].[usuario] WHERE correo = @correo");

  if (result.recordset.length === 0) {
    return "Usuario no encontrado";
  }

  const usuario = result.recordset[0];
  const match = await bcrypt.compare(datos.contrasenia, usuario.contrasena);

  if (!match) {
    return "Contraseña actual incorrecta";
  }

  const nuevaHash = await bcrypt.hash(datos.nueva, 10);

  await pool.request()
    .input("correo", sql.NVarChar(50), datos.correo)
    .input("nueva", sql.NVarChar(sql.MAX), nuevaHash)
    .query("UPDATE [ganaderia].[usuario] SET contrasena = @nueva WHERE correo = @correo");

  return "Cambio de contraseña exitoso";
}
