import { cloudinary } from "../../lib/cloudinary";

import { AppError } from "../../middleware/app-error";

export function generateProductImageSignature(
  sellerId: string
) {
  const timestamp = Math.floor(
    Date.now() / 1000
  );

  const folder =
    `burayumart/products/${sellerId}`;

  const allowedFormats =
    "jpg,jpeg,png,webp";

  const paramsToSign = {
    folder,
    timestamp,
    allowed_formats: allowedFormats,
  };

  const signature =
    cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );

  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME;

  const apiKey =
    process.env.CLOUDINARY_API_KEY;

  if (!cloudName || !apiKey) {
    throw new AppError(
      "Cloudinary is not configured",
      500,
      "CLOUDINARY_NOT_CONFIGURED"
    );
  }

  return {
    cloudName,
    apiKey,

    timestamp,
    signature,

    folder,

    allowedFormats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
    ],
  };
}


export function isProductImageOwnedBySeller(
  publicId: string,
  sellerId: string
) {
  const expectedPrefix =
    `burayumart/products/${sellerId}/`;

  return publicId.startsWith(
    expectedPrefix
  );
}

// export {
//   generateProductImageSignature,
//   isProductImageOwnedBySeller,
// };