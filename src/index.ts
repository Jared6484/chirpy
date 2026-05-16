import express from "express";
import { Request, Response } from "express";
import { middlewareLogResponses, middlewareMetrics } from "./api/midware.js";
import { handlerMetrics, handlerResetMetrics } from "./admin/handlers.js";
import { handlerChirpValidator } from "./api/chirp_validator.js";

const app = express();

const PORT = 8080;

export function handlerReadiness(req: Request, res: Response){
    res
        .set("Content-Type", "text/plain; charset=utf-8")
        .send("OK");
}

app.use(middlewareLogResponses);

app.get("/api/healthz", handlerReadiness);

app.use("/app", middlewareMetrics, express.static("./src/app"));

app.get("/admin/metrics", handlerMetrics);

app.post("/admin/reset", handlerResetMetrics);

app.post("/api/validate_chirp", handlerChirpValidator);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
});