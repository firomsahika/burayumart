import { prisma } from "../../lib/prisma";

import type {
    CreateCategoryInput,
    UpdateCategoryInput,
    CategoryQuery,
} from "./categories.types";

export async function createCategory(
    data: CreateCategoryInput & { slug: string }
) {
    return prisma.category.create({
        data: {
            name: data.name,
            slug: data.slug,
            image: data.image ?? null,
            isActive: data.isActive ?? true,
        },

        include: {
            _count: {
                select: {
                    products: true,
                },
            },
        },
    });
}

export async function findCategoryById(
    categoryId: string
) {
    return prisma.category.findUnique({
        where: {
            id: categoryId,
        },

        include: {
            _count: {
                select: {
                    products: true,
                },
            },
        },
    });
}

export async function findCategoryBySlug(
    slug: string
) {
    return prisma.category.findUnique({
        where: {
            slug,
        },
    });
}

export async function findCategoryByName(
    name: string
) {
    return prisma.category.findFirst({
        where: {
            name: {
                equals: name,
                mode: "insensitive",
            },
        },
    });
}

export async function findCategories(
    query: CategoryQuery
) {
    const {
        page,
        limit,
        search,
        isActive,
    } = query;

    const skip = (page - 1) * limit;

    const where = {
        ...(search
            ? {
                name: {
                    contains: search,
                    mode: "insensitive" as const,
                },
            }
            : {}),

        ...(isActive !== undefined
            ? {
                isActive,
            }
            : {}),
    };

    const [categories, total] =
        await Promise.all([
            prisma.category.findMany({
                where,

                orderBy: {
                    name: "asc",
                },

                skip,
                take: limit,

                include: {
                    _count: {
                        select: {
                            products: true,
                        },
                    },
                },
            }),

            prisma.category.count({
                where,
            }),
        ]);

    return {
        categories,
        total,
    };
}

export async function updateCategory(
    categoryId: string,
    data: UpdateCategoryInput
) {
    return prisma.category.update({
        where: {
            id: categoryId,
        },

        data,

        include: {
            _count: {
                select: {
                    products: true,
                },
            },
        },
    });
}

export async function deleteCategory(
    categoryId: string
) {
    return prisma.category.delete({
        where: {
            id: categoryId,
        },
    });
}