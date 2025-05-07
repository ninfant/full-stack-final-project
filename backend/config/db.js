import knex from "knex";
import dotenv from "dotenv";

dotenv.config(); // para cargar las variables de entorno

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

const db = knex({
  client: "pg", // PostgreSQL
  connection: {
    host: PGHOST,
    port: PGPORT,
    user: PGUSER,
    database: PGDATABASE,
    password: PGPASSWORD,
    ssl: { rejectUnauthorized: false },
  },
});

//to test if the DB was working well
// console.log(process.env.PGHOST);
// db.raw("SELECT 1")
//   .then(() => console.log("Database connected successfully"))
//   .catch((err) => console.error("Database connection failed:", err));

export default db;
