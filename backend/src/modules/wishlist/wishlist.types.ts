export type WishlistItemWithProduct = {
    id: string;
    userId: string;
    productId: string;
    createdAt: Date;

    product: {
        id: string;
        name: string;
        slug: string;
        price: unknown;
        compareAtPrice: unknown;
        status: string;

        images: {
            id: string;
            url: string;
            publicId: string;
            position: number;
        }[];
    };
};