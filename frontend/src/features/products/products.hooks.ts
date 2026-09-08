import {
    useQuery,
} from "@tanstack/react-query";

import {
    getAllProducts,
    getProductById,
} from "./products.api";

export function useProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });
}

export function useProduct(
    productId: string
) {
    return useQuery({
        queryKey: ["products", productId],
        queryFn: () =>
            getProductById(productId),
        enabled: Boolean(productId),
    });
}