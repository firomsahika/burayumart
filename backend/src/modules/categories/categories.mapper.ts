export function mapCategory(category: any) {
    return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        image: category.image,
        isActive: category.isActive,
        productCount:
            category._count?.products ?? undefined,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
    };
}