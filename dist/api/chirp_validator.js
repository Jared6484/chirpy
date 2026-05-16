//import { json } from "node:stream/consumers";
export async function handlerChirpValidator(req, res) {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    });
    req.on("end", () => {
        try {
            const parsedBody = JSON.parse(body);
            let chirp = parsedBody.body;
            if (!chirp) {
                res
                    .status(400)
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({
                    error: "Something went wrong"
                }));
                return;
            }
            if (chirp.length > 140) {
                res
                    .status(400)
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({
                    error: "Chirp is too long"
                }));
                return;
            }
            let cleanedChirp = chirp
                .replace(/kerfuffle\b/gi, "****")
                .replace(/sharbert\b/gi, "****")
                .replace(/fornax\b/gi, "****");
            res
                .status(200)
                .set("Content-Type", "application/json")
                .send(JSON.stringify({
                //cleanedBody: cleanedChirp
                cleanedBody: cleanedChirp
            }));
        }
        catch (error) {
            res.status(400).set("Content-Type", "application/json").send(JSON.stringify({ error: "Something went wrong" }));
        }
    });
}
