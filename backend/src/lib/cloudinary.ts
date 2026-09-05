import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName) {
  throw new Error(
    "CLOUDINARY_CLOUD_NAME is not set"
  );
}

if (!apiKey) {
  throw new Error(
    "CLOUDINARY_API_KEY is not set"
  );
}

if (!apiSecret) {
  throw new Error(
    "CLOUDINARY_API_SECRET is not set"
  );
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

/**
 * Delete an image from Cloudinary.
 *
 * IMPORTANT:
 * The caller must verify that the publicId
 * belongs to the correct seller/product before
 * calling this function.
 */
export async function deleteCloudinaryImage(
  publicId: string
) {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
}

export { cloudinary };