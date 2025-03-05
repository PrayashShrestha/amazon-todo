import { pgDataSource } from "./datasource";


/**
 * establishes database connection
 * @returns {void}
 */
export const DatabaseLoader = async(): Promise<void> => {
  pgDataSource.initialize()
    .then(() => {
      console.log("Database connected");
    });
};



