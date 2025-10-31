import jwt from "jsonwebtoken";

const { sign, verify } = jwt;

const JWT_SECRET = process.env.JWT_SECRET;

const generarToken = (id) => {
  const jwt = sign({ id }, JWT_SECRET);
  return jwt
};

const generarTokenTemporal = (id) => {
  const jwt = sign({ id }, JWT_SECRET, {
    expiresIn: "10m",
  });
  return jwt;
};

const verificarToken = (token) => {
  const esCorrecto = verify(token, JWT_SECRET);
  return esCorrecto;
};

export { generarTokenTemporal, verificarToken, generarToken };
