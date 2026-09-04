import { AppError } from "../middleware/app-error";

export function getRequiredParam(
    value: string | string[] | undefined,
    name: string
): string {
    if (typeof value !== "string" || value.length === 0) {
        throw new AppError(
            `Missing or invalid ${name}`,
            400,
            "INVALID_ROUTE_PARAMETER"
        );
    }

    return value;
}