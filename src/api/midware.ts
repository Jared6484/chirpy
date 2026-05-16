import { Request, Response, NextFunction } from "express";
import { config } from "../config.js";

export function middlewareLogResponses(req: Request, res: Response, next: NextFunction){
    res.on("finish", () => {
        const status = res.statusCode;
        if(status < 200 || status >= 300){
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${status}`);
        }
    })
    next();
}

export function middlewareMetrics(req: Request, res: Response, next: NextFunction){
    config.fileserverHits += 1;

    next();
}
