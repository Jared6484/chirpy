import { config } from "../config.js";
export function handlerMetrics(req, res) {
    res
        .set("Content-Type", "text/plain; charset=utf-8")
        .send(`Hits: ${config.fileserverHits}`);
}
export function handlerResetMetrics(req, res) {
    config.fileserverHits = 0;
    res.json({ Hits: config.fileserverHits });
    res.send("Metrics Reset");
}
