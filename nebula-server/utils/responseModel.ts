type ResponseModel<T> = {
    success: boolean;
    data: T | null;
    error: string | undefined;
};

export default function responseModel<T>(
    data: T | null,
    error?: string,
): ResponseModel<T> {
    return {
        success: error === undefined,
        data,
        error,
    };
}
