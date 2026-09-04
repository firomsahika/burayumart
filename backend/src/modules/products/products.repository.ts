import { prisma } from "../../lib/prisma";
import { Prisma } from "../../generated/prisma/client";
import type { CreateProductInput, UpdateProductInput } from "./products.types";

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
  data: CreateProductInput
) {
  const baseSlug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString(36);
  const createData: Prisma.ProductCreateInput = {
    seller: { connect: { id: sellerId } },
    category: { connect: { id: data.categoryId } },
    name: data.name,
    slug: baseSlug,
    description: data.description ?? "",
    price: data.price,
    quantity: data.quantity,
    minimumOrderQuantity: data.minimumOrderQuantity ?? 1,
    status: "PENDING_REVIEW",
  };

  if (data.sku !== undefined) createData.sku = data.sku;
  if (data.brand !== undefined) createData.brand = data.brand;
  if (data.condition !== undefined) createData.condition = data.condition;
  if (data.compareAtPrice !== undefined) createData.compareAtPrice = data.compareAtPrice;

  return prisma.product.create({
    data: createData,

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