export type AuthUser = {
    id: string;
    name: string;
    email: string;
    role: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: string;
    updatedAt: string;
};