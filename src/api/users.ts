import { Request, Response, NextFunction } from "express";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";

export async function handlerCreateUser(req: Request, res: Response): Promise<void>{
    try {
        const { email } = req.body;

        if (!email) {
            res.status(400).json({ error: "Email is required" });
            return;
        }

        const result = await db.insert(users).values({ email }).returning();

        const user = result[0];

        if (!user) {
            res.status(500).json({ error: "User creation failed" });
            return;
        }

        res.status(201).json({
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}