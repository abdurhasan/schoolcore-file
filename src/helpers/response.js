const response = (status, message, data) => ({
    success: status,
    message,
    ...data
});

module.exports = response;
