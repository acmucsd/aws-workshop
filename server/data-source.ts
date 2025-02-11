import { DataSource } from "typeorm";
import { Trip } from "./models/tripModel";
import dotenv from "dotenv";

dotenv.config();

// Create the DataSource instance
const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
  logging: false,
  entities: [Trip],
});

export { AppDataSource };
