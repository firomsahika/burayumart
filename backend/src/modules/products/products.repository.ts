import { prisma } from "../../lib/prisma";
import { Prisma } from "../../generated/prisma/client";
import type { CreateProductInput, UpdateProductInput } from "./products.types";
import { ProductStatus } from "../../generated/prisma/client";
import { ProductCondition } from "../../generated/prisma/client";

import type {
  ProductImageInput,
  CreateProductRepositoryInput
} from "./products.types";


export async function findCategoryById(
  categoryId: string
) {
  return prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });
}

export async function createProduct(
  sellerId: string,
  data: CreateProductRepositoryInput
) {
  return prisma.$transaction(async (tx) => {
    const productData = {
      sellerId,
      categoryId: data.categoryId,
      name: data.name,
      slug: data.slug,

      ...(data.description !== undefined
        ? {
          description: data.description,
        }
        : {}),

      ...(data.sku !== undefined
        ? {
          sku: data.sku,
        }
        : {}),

      ...(data.brand !== undefined
        ? {
          brand: data.brand,
        }
        : {}),

      // Prisma requires condition because
      // Product.condition is not nullable.
      condition:
        data.condition ?? "NEW",

      price: data.price,

      ...(data.compareAtPrice !== undefined
        ? {
          compareAtPrice:
            data.compareAtPrice,
        }
        : {}),

      quantity: data.quantity,

      minimumOrderQuantity:
        data.minimumOrderQuantity ?? 1,

      status: "PENDING_REVIEW" as const,
    };

    const product =
      await tx.product.create({
        data: productData,
      });

    if (data.images?.length) {
      await tx.productImage.createMany({
        data: data.images.map((image) => ({
          productId: product.id,
          url: image.url,
          publicId: image.publicId,
          position: image.position,
        })),
      });
    }

    return tx.product.findUniqueOrThrow({
      where: {
        id: product.id,
      },
      include: {
        category: true,
        seller: true,
        images: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });
  });
}

export async function findProductById(
  productId: string
) {
  return prisma.product.findUnique({
    where: {
      id: productId,
    },

    include: {
      category: true,

      seller: true,

      images: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });
}

export async function findSellerProductById(
  productId: string,
  sellerId: string
) {
  return prisma.product.findFirst({
    where: {
      id: productId,
      sellerId,
    },

    include: {
      category: true,

      images: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });
}

export async function updateProduct(
  productId: string,
  data: UpdateProductInput
) {
  const updateData: Prisma.ProductUpdateInput = {};

  if (data.categoryId !== undefined) updateData.category = { connect: { id: data.categoryId } };
  if (data.name !== undefined) updateData.name = data.name;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.sku !== undefined) updateData.sku = data.sku;
  if (data.brand !== undefined) updateData.brand = data.brand;
  if (data.condition !== undefined) updateData.condition = data.condition;
  if (data.price !== undefined) updateData.price = data.price;
  if (data.compareAtPrice !== undefined) updateData.compareAtPrice = data.compareAtPrice;
  if (data.quantity !== undefined) updateData.quantity = data.quantity;
  if (data.minimumOrderQuantity !== undefined) updateData.minimumOrderQuantity = data.minimumOrderQuantity;

  return prisma.product.update({
    where: {
      id: productId,
    },

    data: updateData,

    include: {
      category: true,

      images: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });
}

export async function archiveProduct(
  productId: string
) {
  return prisma.product.update({
    where: {
      id: productId,
    },

    data: {
      status: "ARCHIVED",
    },
  });
}

export async function createProductImages(
  productId: string,
  images: {
    url: string;
    publicId?: string | undefined;
    position?: number | undefined;
  }[]
) {
  return prisma.productImage.createMany({
    data: images.map((image, index) => {
      const imgData: Prisma.ProductImageCreateManyInput = {
        productId,
        url: image.url,
        position: image.position ?? index,
      };
      if (image.publicId !== undefined) imgData.publicId = image.publicId;
      return imgData;
    }),
  });
}

export async function deleteProductImages(
  productId: string
) {
  return prisma.productImage.deleteMany({
    where: {
      productId,
    },
  });
}

export async function findProductImageById(
  imageId: string,
  productId: string
) {
  return prisma.productImage.findFirst({
    where: {
      id: imageId,
      productId,
    },
  });
}

export async function findProductImages(
  productId: string
) {
  return prisma.productImage.findMany({
    where: {
      productId,
    },

    orderBy: {
      position: "asc",
    },
  });
}

export async function createProductImage(
  productId: string,
  data: {
    url: string;
    publicId: string;
    position: number;
  }
) {
  return prisma.productImage.create({
    data: {
      productId,
      url: data.url,
      publicId: data.publicId,
      position: data.position,
    },
  });
}

export async function deleteProductImage(
  imageId: string
) {
  return prisma.productImage.delete({
    where: {
      id: imageId,
    },
  });
}


export async function countProductImages(
  productId: string
) {
  return prisma.productImage.count({
    where: {
      productId,
    },
  });
}

export async function updateProductStatus(
  productId: string,
  status: ProductStatus
) {
  return prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      status,
    },
    include: {
      category: true,
      seller: true,
      images: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });
}

export async function updateProductInventory(
  productId: string,
  quantity: number,
  status?: ProductStatus
) {
  return prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      quantity,
      ...(status !== undefined && {
        status,
      }),
    },
    include: {
      category: true,
      seller: true,
      images: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });
}

export async function findProductBySlug(
  sellerId: string,
  slug: string
) {
  return prisma.product.findFirst({
    where: {
      sellerId,
      slug,
    },
  });
}

export async function replaceProductImages(
  productId: string,
  images: ProductImageInput[]
) {
  return prisma.$transaction(async (tx) => {
    // Delete existing images
    await tx.productImage.deleteMany({
      where: {
        productId,
      },
    });

    // Create new images
    if (images.length > 0) {
      await tx.productImage.createMany({
        data: images.map((image) => ({
          productId,
          url: image.url,
          publicId: image.publicId,
          position: image.position,
        })),
      });
    }

    // Return the new image list
    return tx.productImage.findMany({
      where: {
        productId,
      },
      orderBy: {
        position: "asc",
      },
    });
  });
}