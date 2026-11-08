import express from "express";
import { Request, Response } from "express";
import { middlewareErrorHandler, middlewareLogResponses, middlewareMetrics } from "./api/midware.js";
import { handlerMetrics, handlerResetMetrics, handlerReadiness} from "./admin/handlers.js";
import { handlerChirpValidator } from "./api/chirp_validator.js";
import { handlerCreateUser } from "./api/users.js";
import { config } from "./config.js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";



const migrationClient = postgres(config.db.url, { max: 1 });

await migrate(drizzle(migrationClient), config.db.migrationConfig);

await migrationClient.end(); // 

const app = express();
app.use(express.json());

const PORT = 8080;

app.use(middlewareLogResponses);

app.get("/api/healthz", (req, res) => {
    handlerReadiness(req, res);
});

app.get("/admin/metrics", (req, res, next) => {
    Promise.resolve(handlerMetrics(req, res)).catch(next);
});

app.post("/admin/reset", (req, res, next) => {
    Promise.resolve(handlerResetMetrics(req, res)).catch(next);
});

app.post("/api/validate_chirp", (req, res, next) => {
    Promise.resolve(handlerChirpValidator(req, res)).catch(next);
});

app.post("/api/users", async (req, res, next) => {
    try {
        await handlerCreateUser(req, res);
    } catch (err) {
        next(err);
    }
});

app.use(middlewareErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
