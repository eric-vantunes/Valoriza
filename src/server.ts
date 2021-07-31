import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import { router } from "./routes";

import "./database";

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
});

/**
 * GET => Buscar uma informacao 
 * POST => Inserir (criar) uma informacao 
 * PUT => Alterar uma informacao
 * DELETE => Remover um dado 
 * PATCH => Alterar uma informacao especifica
 */

/**
 * Tipos de parametros 
 * Routes Params => http://localhost:3000/produtos/7689789789
 * Query Params => http://localhost:3000/produtos?name=teclado&description=tecladobom&
 * 
 * Body Params => Corpo da requisicao, (POST, PUT, PATCH)
 */

app.listen(3000, () => console.log("Server is running NLW"));