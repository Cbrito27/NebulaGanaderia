import sql from "mssql";

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

let pool;

export async function connectToDatabase() {
  try {
    if (!pool) {
      pool = await sql.connect(dbConfig);
      console.log("✅ Conectado a Azure SQL Database");
    }
    return pool;
  } catch (err) {
    console.error("❌ Error de conexión a Azure SQL:", err);
    throw err;
  }
}

export { sql };
