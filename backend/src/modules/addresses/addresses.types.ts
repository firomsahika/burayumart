export interface CreateAddressInput {
    label: string;
    fullName: string;
    phone: string;

    city: string;
    subCity?: string;
    woreda?: string;
    kebele?: string;
    street?: string;
    landmark?: string;

    latitude?: number;
    longitude?: number;

    isDefault?: boolean;
}

export interface UpdateAddressInput {
    label?: string;
    fullName?: string;
    phone?: string;

    city?: string;
    subCity?: string;
    woreda?: string;
    kebele?: string;
    street?: string;
    landmark?: string;

    latitude?: number;
    longitude?: number;

    isDefault?: boolean;
}