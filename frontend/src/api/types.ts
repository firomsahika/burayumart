export type ApiSuccessResponse<T> = {
    success: true;
    message?: string;
    data: T;
};

export type ApiErrorResponse = {
    success: false;
    error: {
        code: string;
        message: string;
    };
};

export type ApiResponse<T> =
    | ApiSuccessResponse<T>
    | ApiErrorResponse;