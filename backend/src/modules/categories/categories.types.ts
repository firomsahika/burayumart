export interface CreateCategoryInput {
    name: string;
    slug?: string;
    image?: string | null;
    isActive?: boolean;
}

export interface UpdateCategoryInput {
    name?: string;
    slug?: string;
    image?: string | null;
    isActive?: boolean;
}

export interface CategoryQuery {
    page: number;
    limit: number;
    search?: string;
    isActive?: boolean;
}

export interface CategoryListResult<T> {
    categories: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}