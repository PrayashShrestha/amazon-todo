import { DataSource,  } from "typeorm";
import { Category, Todo } from "@modules/entities";
import environment from "@lib/environment";

type dialect = "mysql"|"postgres"

export const pgDataSource = new DataSource({
  type: environment.dbDialect as dialect,
  host: environment.dbHost,
  port: environment.dbPort,
  username: environment.dbUser,
  password: environment.dbPassword,
  database: environment.dbName,
  // @TODO set to false and use migration to sync the entities to database
  synchronize: true, // this should never be set, doing just for development purpose
  logging: environment.dbLogging,
  entities: [Todo, Category],
  subscribers: [],
  migrations: [],
});