export const queryErrorMessage = (ex: unknown) => {
    if (ex instanceof Error) {
        return ex.message; // 安全访问 Error 的 message 属性
    } else {
        return String(ex); // 其他类型的异常
    }
};
