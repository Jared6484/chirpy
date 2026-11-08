import { Request, Response, NextFunction } from "express";
import { config } from "../config.js";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";

export function handlerMetrics(req: Request, res: Response){
    res   
        .set("Content-Type", "text/html; charset=utf-8")
        .send(`const html = 
            <html>
                <body>
                    <h1>Welcome, Chirpy Admin</h1>
                    <p>Chirpy has been visited ${config.api.fileserverHits} times!</p>
                </body>
            </html>
            `);
}

export async function handlerResetMetrics(req: Request, res: Response): Promise<void>{
    if(config.api.platform != "dev"){
        res.sendStatus(403);
        return;
    }

    await db.delete(users);

    config.api.fileserverHits = 0;
    res
        .status(200)
        .json({
            Hits: config.api.fileserverHits
        });
}

export function handlerReadiness(req: Request, res: Response){
    res
        .set("Content-Type", "text/plain; charset=utf-8")
        .send("OK");
}
