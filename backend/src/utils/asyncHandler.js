// function to handle promise rejections instead of using try and catch blocks
const asyncHandler = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
};

export default asyncHandler;
