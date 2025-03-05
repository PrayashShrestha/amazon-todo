import httpContext from "express-http-context";

import environment from "@lib/environment";
import { Logger } from "@modules/logger";

/**
 *
 * @returns {Record<string,unknown>}
 */
const getHttpContext = (): Record<string, unknown> => {
  const requestId = httpContext.get("requestId");
  return { requestId };
};

export const logger = new Logger({
  nodeEnv:
    environment.nodeEnv === "production" ? environment.nodeEnv : "development",
  defaultMeta: { service: "todo-service", logger: "generalLogger" },
  level: "debug",
  metaProvider: getHttpContext,
});
