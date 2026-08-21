import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export function validate(schema: AnyZodObject) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({ body: req.body, query: req.query, params: req.params });
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                return res
                    .status(400)
                    .json({ message: "Validation failed", errors: err.errors });
            }
            next(err);
        }
    };
}