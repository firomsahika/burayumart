export type ProductCondition =
    | "NEW"
    | "LIKE_NEW"
    | "USED"
    | "REFURBISHED";

export type ProductStatus =
    | "DRAFT"
    | "PENDING_REVIEW"
    | "AVAILABLE"
    | "OUT_OF_STOCK"
    | "REJECTED"
    | "ARCHIVED";

export type ProductImage = {
    id: string;
    url: string;
    publicId: string;
    position: number;
};

export type ProductCategory = {
    id: string;
    name: string;
    slug: string;
    image: string | null;
};

export type ProductSeller = {
    id: string;
    storeName: string;
    logo: string | null;
    status: string;
};

export type Product = {
    id: string;
    name: string;
    slug: string;
    description: string | null;

    sku: string | null;
    brand: string | null;
    condition: ProductCondition;

    price: string | number;
    compareAtPrice: string | number | null;

    quantity: number;
    minimumOrderQuantity: number;

    status: ProductStatus;

    createdAt: string;
    updatedAt: string;

    category: ProductCategory;
    seller: ProductSeller;

    images: ProductImage[];
};