export default (data, error) => {
    return {
        success: error === undefined,
        data,
        error,
    };
};
