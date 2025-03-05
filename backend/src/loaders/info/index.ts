/** Imports */
import { environment } from "@lib/environment";

/**
 * prints some metadata in console
 * @returns {void}
 */
export const InfoLoader = (): void => {
  if (environment.underMaintenance) {
    console.info("starting in maintenance mode. services will be unavailable");
  }
  console.log("");
  console.log("-------------------------------------------------------");
  console.log("");
  console.log("todo_backend");
  console.log(
    `${environment.dbDialect} @ ${environment.dbHost}:${environment.dbPort}`
  );
  console.log("");
  console.log("-------------------------------------------------------");
  console.log("");
};
