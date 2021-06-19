module.exports = (data, success, message) => {
    return {
        success: success || false,
        message: message || null,
        data: data || null,
    };
};