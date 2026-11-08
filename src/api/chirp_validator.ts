import { Request, Response, NextFunction } from "express";
import { BadRequest } from "./errors.js";
import {respondWithJSON} from "./json.js";
//import { json } from "node:stream/consumers";

export async function handlerChirpValidator(req: Request, res: Response) {
  type parameters = {
    body: string;
  };

  const params: parameters = req.body;

  const maxChirpLength = 140;
  if (params.body.length > maxChirpLength) {
    throw new BadRequest("Chirp is too long. Max length is 140");
  }

  const words = params.body.split(" ");

  const badWords = ["kerfuffle", "sharbert", "fornax"];
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const loweredWord = word.toLowerCase();
    if (badWords.includes(loweredWord)) {
      words[i] = "****";
    }
  }

  const cleaned = words.join(" ");

  respondWithJSON(res, 200, {
    cleanedBody: cleaned,
  });
}
