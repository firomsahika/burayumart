import { AppError } from "../../middleware/app-error";

import * as categoriesRepository from "./categories.repository";

import type {
    CreateCategoryInput,
    UpdateCategoryInput,
    CategoryQuery,
} from "./categories.types";

import {
    slugify,
} from "../../utils/slug";

async function generateUniqueSlug(
    name: string,
    requestedSlug?: string,
    currentCategoryId?: string
) {
    const baseSlug = slugify(
        requestedSlug || name
    );

    if (!baseSlug) {
        throw new AppError(
            "Unable to generate category slug",
            400,
            "INVALID_CATEGORY_SLUG"
        );
    }

    let slug = baseSlug;
    let counter = 1;

    while (true) {
        const existing =
            await categoriesRepository.findCategoryBySlug(
                slug
            );

        if (
            !existing ||
            existing.id === currentCategoryId
        ) {
            return slug;
        }

        slug = `${baseSlug}-${counter}`;
        counter++;
    }
}

export async function createCategory(
    data: CreateCategoryInput
) {
    const existingName =
        await categoriesRepository.findCategoryByName(
            data.name
        );

    if (existingName) {
        throw new AppError(
            "A category with this name already exists",
            409,
            "CATEGORY_NAME_EXISTS"
        );
    }

    const slug =
        await generateUniqueSlug(
            data.name,
            data.slug
        );

    const existingSlug =
        await categoriesRepository.findCategoryBySlug(
            slug
        );

    if (existingSlug) {
        throw new AppError(
            "A category with this slug already exists",
            409,
            "CATEGORY_SLUG_EXISTS"
        );
    }

    return categoriesRepository.createCategory({
        ...data,
        slug,
    });
}

export async function getCategoryById(
    categoryId: string
) {
    const category =
        await categoriesRepository.findCategoryById(
            categoryId
        );

    if (!category) {
        throw new AppError(
            "Category not found",
            404,
            "CATEGORY_NOT_FOUND"
        );
    }

    return category;
}

export async function getCategories(
    query: CategoryQuery
) {
    const {
        categories,
        total,
    } =
        await categoriesRepository.findCategories(
            query
        );

    return {
        categories,
        pagination: {
            page: query.page,
            limit: query.limit,
            total,
            totalPages: Math.ceil(
                total / query.limit
            ),
        },
    };
}

export async function updateCategory(
    categoryId: string,
    data: UpdateCategoryInput
) {
    const existingCategory =
        await categoriesRepository.findCategoryById(
            categoryId
        );

    if (!existingCategory) {
        throw new AppError(
            "Category not found",
            404,
            "CATEGORY_NOT_FOUND"
        );
    }

    if (data.name) {
        const existingName =
            await categoriesRepository.findCategoryByName(
                data.name
            );

        if (
            existingName &&
            existingName.id !== categoryId
        ) {
            throw new AppError(
                "A category with this name already exists",
                409,
                "CATEGORY_NAME_EXISTS"
            );
        }
    }

    let slug = data.slug;

    if (data.name || data.slug) {
        slug =
            await generateUniqueSlug(
                data.name ?? existingCategory.name,
                data.slug,
                categoryId
            );
    }

    return categoriesRepository.updateCategory(
        categoryId,
        {
            ...data,
            ...(slug !== undefined
                ? { slug }
                : {}),
        }
    );
}

export async function setCategoryStatus(
    categoryId: string,
    isActive: boolean
) {
    const category =
        await categoriesRepository.findCategoryById(
            categoryId
        );

    if (!category) {
        throw new AppError(
            "Category not found",
            404,
            "CATEGORY_NOT_FOUND"
        );
    }

    return categoriesRepository.updateCategory(
        categoryId,
        {
            isActive,
        }
    );
}