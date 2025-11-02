import { connectToDatabase, sql } from "../database/database-config.js";
import { verificarClave } from "../util/bcrypt.js";
import { generarToken } from "../util/jwt.js";

export const loginServicio = async (correo, contrasenaIngresada) => {
  const pool = await connectToDatabase();

  const result = await pool
    .request()
    .input("correo", sql.NVarChar(50), correo)
    .query(`
      SELECT 
        u.id_usuario,
        u.nombre_us,
        u.correo,
        u.contrasena,
        u.telefono,
        u.cod_empleado,
        r.cod_rol,
        r.nombre_rol,
        r.descripcion AS descripcion_rol
      FROM [ganaderia].[usuario] AS u
      INNER JOIN [ganaderia].[rol] AS r ON u.cod_rol = r.cod_rol
      WHERE u.correo = @correo
    `);

  const usuario = result.recordset[0];

  // Si no existe el correo
  if (!usuario) return "204";

  // Validar contraseña
  const esValida = await verificarClave(contrasenaIngresada, usuario.contrasena);
  if (!esValida) return "204";

  // Generar token
  const token = generarToken({
    id: usuario.id_usuario,
    correo: usuario.correo,
    rol: usuario.nombre_rol, // Ahora usamos el nombre del rol
  });

  // Estructurar respuesta
  const data = {
    id_usuario: usuario.id_usuario,
    nombre: usuario.nombre_us,
    correo: usuario.correo,
    telefono: usuario.telefono,
    rol: {
      codigo: usuario.cod_rol,
      nombre: usuario.nombre_rol,
      descripcion: usuario.descripcion_rol,
    },
    cod_empleado: usuario.cod_empleado,
    token,
  };
  
  return data;
};
