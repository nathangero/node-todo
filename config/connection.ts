import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

let sequelize: Sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  console.log("using local db");

  const dbName = process.env.DB_NAME;
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;

  // Account for null
  if (!dbName || !dbUser || !dbPassword) {
    throw new Error("Missing required environment variables for database connection");
  }

  sequelize = new Sequelize(
    dbName,
    dbUser,
    dbPassword,
    {
      host: "localhost",
      dialect: "postgres",
      port: 3306
    }
  )
}

export default sequelize;