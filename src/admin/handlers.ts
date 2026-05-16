import { Request, Response, NextFunction } from "express";
import { config } from "../config.js";

export function handlerMetrics(req: Request, res: Response){
    res   
        .set("Content-Type", "text/html; charset=utf-8")
        .send(`const html = 
            <html>
                <body>
                    <h1>Welcome, Chirpy Admin</h1>
                    <p>Chirpy has been visited ${config.fileserverHits} times!</p>
                </body>
            </html>
            `);
}

export function handlerResetMetrics(req: Request, res: Response){
    config.fileserverHits = 0;
    res.json({Hits: config.fileserverHits});
    res.send("Metrics Reset");
}