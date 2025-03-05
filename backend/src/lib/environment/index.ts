import { URL } from "url";
import { ENVIRONMENT } from "@utils/enums";
import { LogLevels } from "@modules/logger";
export class Environment {
    apiPort?: number = 8080;

    nodeEnv: ENVIRONMENT = ENVIRONMENT.DEVELOPMENT;

    dbHost?: string;
    dbPort?: number;
    dbName?: string;
    dbUser?: string;
    dbPassword?: string;
    dbLogging?: boolean;
    dbDialect?:string;

    underMaintenance?: boolean = false;
    logLevel: LogLevels = "debug";

    allowedCorsDomains?: string[];

    errors: string[] = [];

    /**
     * constructor
     */
    constructor() {
        this.nodeEnv = this.stringFromEnv("NODE_ENV") as ENVIRONMENT;
        this.apiPort = this.numberFromEnv("API_PORT");
        this.allowedCorsDomains = this.arrayOfUrlsFromEnv("CORS_ALLOWED");
        this.underMaintenance = this.booleanFromEnv("MAINTENANCE_MODE", false);
        this.dbHost = this.stringFromEnv("DB_HOST");
        this.dbPort = this.numberFromEnv("DB_PORT");
        this.dbName = this.stringFromEnv("DB_NAME");
        this.dbUser = this.stringFromEnv("DB_USER");
        this.dbPassword = this.stringFromEnv("DB_PASSWORD");
        this.dbDialect = this.stringFromEnv("DB_DIALECT");
    }

    /**
     * returns boolean value to indicate if error
     * has occurred in parsing the env variables
     *
     * @returns {boolean} value indicating if error has occurred
     */
    public hasErrors(): boolean {
        return Boolean(this.errors.length);
    }

    /**
     * sets the value of any key to undefined
     *
     * @param {string} key
     * @returns {undefined}
     */
    private setUndefined(key: string): undefined {
        this.errors.push(`Environment variable ${key} is not defined`);
        return undefined;
    }

    /**
     * extracts string from process.env
     *
     * @param {string} key
     * @returns {string | undefined}
     */
    private stringFromEnv(key: string): string | undefined {
        const rawValue = process.env[key]?.trim();
        if (rawValue === undefined) {
            return this.setUndefined(key);
        }
        return rawValue;
    }

    /**
     * extracts number from process.env
     *
     * @param {string} key
     * @returns {number|undefined}
     */
    private numberFromEnv(key: string): number | undefined {
        const rawValue = process.env[key]?.trim();
        const value = Number(rawValue);

        if (rawValue === undefined) {
            return this.setUndefined(key);
        }

        if (!isNaN(value)) {
            return value;
        } else {
            this.errors.push(
                `Environment variable ${key} is not a valid number: ${rawValue}`
            );
            return undefined;
        }
    }

    /**
     * extracts array from process.env
     *
     * @param {string} key
     * @returns {string[] | undefined}
     */
    private arrayFromEnv(key: string): string[] | undefined {
        const rawValue = process.env[key]?.trim().split(",");
        if (rawValue === undefined) {
            return this.setUndefined(key);
        }
        return rawValue;
    }

    /**
     * extracts array of urls from process.env
     *
     * @param {string} key
     * @returns {string[] | undefined}
     */
    private arrayOfUrlsFromEnv(key: string): string[] | undefined {
        const rawValue = this.arrayFromEnv(key);
        if (rawValue === undefined) {
            return this.setUndefined(key);
        }
        return rawValue.map((url) => {
            const u = new URL(url);
            return `${u.protocol}//${u.host}`;
        });
    }

    /**
     * extracts url from process.env
     *
     * @param {string} key
     * @returns {string | undefined}
     */
    private urlFromEnv(key: string): string | undefined {
        const rawValue = process.env[key]?.trim();
        // rawValue?.replace(/\/$/, ""); // No trailing slash
        if (rawValue === undefined) {
            return this.setUndefined(key);
        }
        const u = new URL(rawValue);
        return `${u.protocol}//${u.host}`;
    }

    /**
     * extracts boolean from process.env
     *
     * @param {string} key
     * @param {boolean} defaultValue
     * @returns {string | undefined}
     */
    private booleanFromEnv(
        key: string,
        defaultValue?: boolean
    ): boolean | undefined {
        const rawValue = process.env[key]?.trim();

        if (rawValue === undefined && defaultValue !== undefined) {
            return defaultValue;
        }

        const numberValue = Number(rawValue);
        if (Number.isNaN(numberValue)) {
            this.errors.push(`Environment variable ${key} is not a valid boolean`);
            return undefined;
        }
        return Boolean(Number(rawValue));
    }
}

export const environment = new Environment();
export default environment;