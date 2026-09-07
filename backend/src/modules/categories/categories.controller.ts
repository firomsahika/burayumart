import type {
    Request,
    Response,
    NextFunction,
} from "express";

import * as categoriesService from "./categories.service";

import {
    createCategorySchema,
    updateCategorySchema,
    categoryQuerySchema,
} from "./categories.schema";

import {
    mapCategory,
} from "./categories.mapper";

import {
    getRequiredParam,
} from "../../helpers/get-params";
import type { CreateCategoryInput } from "./categories.types";

export async function createCategory(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const data =
            createCategorySchema.parse(
                req.body
            );

        const category =
            await categoriesService.createCategory(
                data,
            );

        return res.status(201).json({
            success: true,
            message:
                "Category created successfully",
            data: {
                category:
                    mapCategory(category),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function getCategories(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const query =
            categoryQuerySchema.parse(
                req.query
            );

        const result =
            await categoriesService.getCategories(
                query
            );

        return res.status(200).json({
            success: true,
            data: {
                categories:
                    result.categories.map(
                        mapCategory
                    ),

                pagination:
                    result.pagination,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function getCategoryById(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const categoryId =
            getRequiredParam(
                req.params.id,
                "category ID"
            );

        const category =
            await categoriesService.getCategoryById(
                categoryId
            );

        return res.status(200).json({
            success: true,
            data: {
                category:
                    mapCategory(category),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function updateCategory(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const categoryId =
            getRequiredParam(
                req.params.id,
                "category ID"
            );

        const data =
            updateCategorySchema.parse(
                req.body
            );

        const category =
            await categoriesService.updateCategory(
                categoryId,
                data
            );

        return res.status(200).json({
            success: true,
            message:
                "Category updated successfully",
            data: {
                category:
                    mapCategory(category),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function activateCategory(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const categoryId =
            getRequiredParam(
                req.params.id,
                "category ID"
            );

        const category =
            await categoriesService.setCategoryStatus(
                categoryId,
                true
            );

        return res.status(200).json({
            success: true,
            message:
                "Category activated successfully",
            data: {
                category:
                    mapCategory(category),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function deactivateCategory(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const categoryId =
            getRequiredParam(
                req.params.id,
                "category ID"
            );

        const category =
            await categoriesService.setCategoryStatus(
                categoryId,
                false
            );

        return res.status(200).json({
            success: true,
            message:
                "Category deactivated successfully",
            data: {
                category:
                    mapCategory(category),
            },
        });
    } catch (error) {
        next(error);
    }
}