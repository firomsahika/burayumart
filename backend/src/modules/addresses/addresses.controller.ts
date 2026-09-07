import type {
    Request,
    Response,
    NextFunction,
} from "express";

import * as addressesService from "./addresses.service";

import {
    createAddressSchema,
    updateAddressSchema,
    addressIdParamsSchema,
} from "./addresses.schema";

import { mapAddress } from "./addresses.mapper";

export async function createAddress(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const data = createAddressSchema.parse(
            req.body
        );

        const address =
            await addressesService.createAddress(
                req.user!.id,
                data
            );

        return res.status(201).json({
            success: true,
            message: "Address created successfully",
            data: {
                address: mapAddress(address),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function getMyAddresses(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const addresses =
            await addressesService.getMyAddresses(
                req.user!.id
            );

        return res.status(200).json({
            success: true,
            data: {
                addresses: addresses.map(mapAddress),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function getMyAddress(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id } =
            addressIdParamsSchema.parse(
                req.params
            );

        const address =
            await addressesService.getMyAddress(
                req.user!.id,
                id
            );

        return res.status(200).json({
            success: true,
            data: {
                address: mapAddress(address),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function updateMyAddress(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id } =
            addressIdParamsSchema.parse(
                req.params
            );

        const data =
            updateAddressSchema.parse(req.body);

        const address =
            await addressesService.updateMyAddress(
                req.user!.id,
                id,
                data
            );

        return res.status(200).json({
            success: true,
            message: "Address updated successfully",
            data: {
                address: mapAddress(address),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteMyAddress(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id } =
            addressIdParamsSchema.parse(
                req.params
            );

        await addressesService.deleteMyAddress(
            req.user!.id,
            id
        );

        return res.status(200).json({
            success: true,
            message: "Address deleted successfully",
            data: null,
        });
    } catch (error) {
        next(error);
    }
}

export async function setDefaultAddress(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id } =
            addressIdParamsSchema.parse(
                req.params
            );

        const address =
            await addressesService.setDefaultAddress(
                req.user!.id,
                id
            );

        return res.status(200).json({
            success: true,
            message:
                "Default address updated successfully",
            data: {
                address: mapAddress(address),
            },
        });
    } catch (error) {
        next(error);
    }
}