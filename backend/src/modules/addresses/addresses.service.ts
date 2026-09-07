// import { AppError } from "../../lib/AppError";
import { AppError } from "../../middleware/app-error";
import * as addressesRepository from "./addresses.repository";
import type {
    CreateAddressInput,
    UpdateAddressInput,
} from "./addresses.types";

export async function createAddress(
    userId: string,
    data: CreateAddressInput
) {
    if (data.isDefault) {
        await addressesRepository.clearDefaultAddresses(
            userId
        );
    }

    return addressesRepository.createAddress(
        userId,
        data
    );
}

export async function getMyAddresses(
    userId: string
) {
    return addressesRepository.findAddressesByUserId(
        userId
    );
}

export async function getMyAddress(
    userId: string,
    addressId: string
) {
    const address =
        await addressesRepository.findUserAddressById(
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

    return address;
}

export async function updateMyAddress(
    userId: string,
    addressId: string,
    data: UpdateAddressInput
) {
    const existingAddress =
        await addressesRepository.findUserAddressById(
            addressId,
            userId
        );

    if (!existingAddress) {
        throw new AppError(
            "Address not found",
            404,
            "ADDRESS_NOT_FOUND"
        );
    }

    if (data.isDefault === true) {
        await addressesRepository.clearDefaultAddresses(
            userId
        );
    }

    return addressesRepository.updateAddress(
        addressId,
        data
    );
}

export async function deleteMyAddress(
    userId: string,
    addressId: string
) {
    const existingAddress =
        await addressesRepository.findUserAddressById(
            addressId,
            userId
        );

    if (!existingAddress) {
        throw new AppError(
            "Address not found",
            404,
            "ADDRESS_NOT_FOUND"
        );
    }

    await addressesRepository.deleteAddress(
        addressId
    );

    return {
        id: addressId,
    };
}

export async function setDefaultAddress(
    userId: string,
    addressId: string
) {
    const existingAddress =
        await addressesRepository.findUserAddressById(
            addressId,
            userId
        );

    if (!existingAddress) {
        throw new AppError(
            "Address not found",
            404,
            "ADDRESS_NOT_FOUND"
        );
    }

    await addressesRepository.clearDefaultAddresses(
        userId
    );

    return addressesRepository.updateAddress(
        addressId,
        {
            isDefault: true,
        }
    );
}