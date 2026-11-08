import { MigrationConfig } from "drizzle-orm/migrator";
import { PipelineTransform } from "node:stream";

process.loadEnvFile()

const dbURL = process.env.DB_URL;

if(!dbURL){
    throw new Error("DBURL env variable is required");
}

const platform = process.env.PLATFORM;

if(!platform){
    throw new Error("PLATFORM env variable is required")
}

const migrationConfig: MigrationConfig = {
    migrationsFolder: "./src/db/migrations",
};

type APIConfig = {
    fileserverHits: number;
    platform: string;
};

type DBConfig = {
    url: string;
    migrationConfig: MigrationConfig;
}

type Config = {
    db: DBConfig,
    api: APIConfig,
}

type migrationConfig = {
    migrationsFolder: "./src/db/migrations";
}

export const config: Config = {
    api: {
        fileserverHits: 0,
        platform: platform,
    },
    db: {
        url: dbURL,
        migrationConfig: migrationConfig,
    },
};



