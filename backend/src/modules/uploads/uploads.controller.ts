import type {
    Request,
    Response,
    NextFunction,
} from "express";

import * as uploadsService from "./uploads.service";


export async function createProductImageSignature(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const signature =
            uploadsService.generateProductImageSignature(
                req.seller!.id
            );

        return res.status(200).json({
            success: true,
            data: {
                upload: signature,
            },
        });
    } catch (error) {
        next(error);
    }
}