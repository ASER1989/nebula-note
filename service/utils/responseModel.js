module.exports = (data, error) => {
    return {
        success: error === undefined,
        data,
        error,
    };
};
