import { AppError } from "../../middleware/app-error";
import * as sellersRepository from "./sellers.repository";
import type {
  ApplyAsSellerInput,
  UpdateSellerProfileInput,
} from "./sellers.types";

export async function getMySellerProfile(
  userId: string
) {
  const seller = await sellersRepository.findSellerByUserId(userId);

  if (!seller) {
    throw new AppError(
      "You are not registered as a seller",
      404,
      "SELLER_NOT_FOUND"
    );
  }

  return seller;
}

export async function applyAsSeller(
  userId: string,
  data: ApplyAsSellerInput
) {
  const existingSeller = await sellersRepository.findSellerByUserId(userId);

  if (existingSeller) {
    if (existingSeller.status === "APPROVED") {
      throw new AppError(
        "You are already an approved seller",
        409,
        "SELLER_ALREADY_APPROVED"
      );
    }

    if (existingSeller.status === "PENDING") {
      throw new AppError(
        "Your seller application is already under review",
        409,
        "SELLER_APPLICATION_PENDING"
      );
    }

    if (existingSeller.status === "SUSPENDED") {
      throw new AppError(
        "Your seller account is suspended",
        403,
        "SELLER_SUSPENDED"
      );
    }

    /*
     * REJECTED
     *
     * We allow the seller to submit again.
     */
    return sellersRepository.updateSellerProfile(
      existingSeller.id,
      {
        ...data,
      }
    );
  }

  return sellersRepository.createSellerProfile(
    userId,
    data
  );
}

export async function updateMySellerProfile(
  userId: string,
  data: UpdateSellerProfileInput
) {
  const seller =await sellersRepository.findSellerByUserId(userId);

  if (!seller) {
    throw new AppError(
      "Seller profile not found",
      404,
      "SELLER_NOT_FOUND"
    );
  }

  if (seller.status === "SUSPENDED") {
    throw new AppError(
      "Your seller account is suspended",
      403,
      "SELLER_SUSPENDED"
    );
  }

  /*
   * Approved sellers can update normal profile
   * information without changing their approval status.
   */
  return sellersRepository.updateSellerProfile(
    seller.id,
    data
  );
}