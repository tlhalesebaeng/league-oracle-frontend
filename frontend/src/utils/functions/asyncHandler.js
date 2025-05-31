export const asyncHandler = (fn) => {
    return async (...args) => {
        try {
            return await fn(...args);
        } catch (error) {
            throw new Error('An error occurred');
        }
    };
};
