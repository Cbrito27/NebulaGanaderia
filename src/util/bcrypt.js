import { compare, hash } from "bcrypt";

const encriptarContrasena = async (clave) => {
  const claveEncriptada = await hash(clave, 8);
  return claveEncriptada;
};

const verificarClave = async (clave, claveEncriptada) => {

  const esCorrecto = await compare(clave, claveEncriptada);
  return esCorrecto;
}
export { encriptarContrasena, verificarClave };
