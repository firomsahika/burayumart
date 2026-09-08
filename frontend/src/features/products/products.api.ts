import { apiClient } from "../../api/client";
import type { Product } from "./products.types";

export type GetProductsResponse = {
    products: Product[];
};

export async function getAllProducts() {
    const data =
        await apiClient<GetProductsResponse>(
            "/products"
        );

    return data.products;
}

export async function getProductById(
    productId: string
) {
    const data =
        await apiClient<{
            product: Product;
        }>(
            `/products/${productId}`
        );

    return data.product;
}