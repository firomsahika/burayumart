import { apiFetch } from "./api";
import * as ImagePicker from "expo-image-picker";


interface UploadSignatureResponse {
    success: boolean;
    data: {
        upload: {
            cloudName: string;
            apiKey: string;
            timestamp: number;
            signature: string;
            folder: string;
            allowedFormats: string[];
        };
    };
}

export async function getProductImageSignature() {
    const response = await apiFetch(
        "/api/v1/uploads/product-image/signature",
        {
            method: "POST",
        }
    );

    if (!response.ok) {
        const error = await response.json();

        throw new Error(
            error?.error?.message ??
            "Failed to get upload signature"
        );
    }

    const data =
        (await response.json()) as UploadSignatureResponse;

    return data.data.upload;
}

export async function uploadProductImage(
    imageUri: string
) {
    const signature =
        await getProductImageSignature();

    const formData = new FormData();

    formData.append("file", {
        uri: imageUri,
        name: `product-${Date.now()}.jpg`,
        type: "image/jpeg",
    } as any);

    formData.append(
        "api_key",
        signature.apiKey
    );

    formData.append(
        "timestamp",
        String(signature.timestamp)
    );

    formData.append(
        "signature",
        signature.signature
    );

    formData.append(
        "folder",
        signature.folder
    );

    formData.append(
        "allowed_formats",
        signature.allowedFormats.join(",")
    );

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!response.ok) {
        const error = await response.text();

        throw new Error(
            `Cloudinary upload failed: ${error}`
        );
    }

    const result = await response.json();

    return {
        url: result.secure_url as string,
        publicId: result.public_id as string,
        width: result.width as number,
        height: result.height as number,
        format: result.format as string,
    };
}


export async function pickProductImage() {
    const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
        throw new Error(
            "Photo library permission is required"
        );
    }

    const result =
        await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 0.85,
        });

    if (result.canceled) {
        return null;
    }

    return result.assets[0].uri;
}