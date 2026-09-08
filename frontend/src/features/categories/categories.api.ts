import { apiClient } from "../../api/client";
import type { Category } from "./categories.types";

export type GetCategoriesResponse = {
    categories: Category[];
};

export async function getAllCategories() {
    const data =
        await apiClient<GetCategoriesResponse>(
            "/categories"
        );

    return data.categories;
}