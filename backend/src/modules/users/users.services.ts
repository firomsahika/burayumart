import { AppError } from "../../middleware/app-error";
import * as usersRepository from "./users.repository";
import type {
  UpdateProfileInput,
  CreateAddressInput,
  UpdateAddressInput,
} from "./users.types";

export async function getMyProfile(userId: string) {
  const user = await usersRepository.findUserById(userId);

  if (!user) {
    throw new AppError(
      "User not found",
      404,
      "USER_NOT_FOUND"
    );
  }

  return user;
}

export async function updateMyProfile(
  userId: string,
  data: UpdateProfileInput
) {
  const user = await usersRepository.findUserById(userId);

  if (!user) {
    throw new AppError(
      "User not found",
      404,
      "USER_NOT_FOUND"
    );
  }

  return usersRepository.updateUser(userId, data);
}

export async function getMyAddresses(userId: string) {
  return usersRepository.findAddressesByUserId(userId);
}

export async function createMyAddress(
  userId: string,
  data: CreateAddressInput
) {
  if (data.isDefault) {
    await usersRepository.clearDefaultAddresses(userId);
  }

  return usersRepository.createAddress(userId, data);
}

export async function updateMyAddress(
  userId: string,
  addressId: string,
  data: UpdateAddressInput
) {
  const address = await usersRepository.findAddressById(
    addressId,
    userId
  );

  if (!address) {
    throw new AppError(
      "Address not found",
      404,
      "ADDRESS_NOT_FOUND"
    );
  }

  if (data.isDefault) {
    await usersRepository.clearDefaultAddresses(userId);
  }

  return usersRepository.updateAddress(addressId, data);
}

export async function deleteMyAddress(
  userId: string,
  addressId: string
) {
  const address = await usersRepository.findAddressById(
    addressId,
    userId
  );

  if (!address) {
    throw new AppError(
      "Address not found",
      404,
      "ADDRESS_NOT_FOUND"
    );
  }

  await usersRepository.deleteAddress(addressId);

  return {
    message: "Address deleted successfully",
  };
}