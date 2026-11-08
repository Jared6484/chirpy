import { Request, Response, NextFunction } from "express";
import { config } from "../config.js";
import { BadRequest, Forbidden, NotFound, Unauthorized } from "./errors.js";

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
    config.api.fileserverHits += 1;

    next();
}

export function middlewareErrorHandler(err: Error, req: Request, res: Response, next: NextFunction){
    console.log(err);
    if (err instanceof BadRequest){
        res.status(400).json({error: err.message});
    } else if (err instanceof Unauthorized){
        res.status(401).json({error: err.message});
    } else if (err instanceof Forbidden){
        res.status(403).json({error: err.message});
    } else if (err instanceof NotFound){
        res.status(404).json({error: err.message});
    } else{
        res.status(500).json({
            error: "Something went wrong on our end"
        });
    }
}
