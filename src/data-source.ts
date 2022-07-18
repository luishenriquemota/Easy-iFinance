import { DataSource } from "typeorm";
require("dotenv").config()

export const AppDataSource = 
process.env.NODE_ENV === "test"?
new DataSource({
  type:"sqlite",
  database:":memory:",
  entities:["src/entities/*.ts"],
  synchronize:true,
}):
new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  url:process.env.DATABASE_URL,
  ssl:process.env.NODE_ENV === "production"?
  {rejectUnauthorized:false}
  :false,
  synchronize: false,
  logging: false,
  entities: process.env.NODE_ENV === "production"?  ["dist/entities/*.js"]: ["src/entities/*.ts"],
  migrations: process.env.NODE_ENV === "production"? ["dist/migrations/*.js"]:["src/migrations/*.ts"],
})


