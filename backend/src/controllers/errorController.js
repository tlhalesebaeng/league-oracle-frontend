import AppError from '../AppError.js';

const handleValidationError = () => {
    const err = new AppError(
        400,
        'Invalid input data! Please check fields and try again'
    );
    return err;
};

const handleCastError = (error) => {
    const err = new AppError(
        400,
        `Invalid ${error.path}: ${error.value}! Please check your ${error.path} and try again`
    );
    return err;
};

const handleDuplicatesError = (error) => {
    // get the first duplicated key
    const keyValue = Object.keys(error.keyValue)[0];

    // convert the first character of the key to upper case
    const key = keyValue.charAt(0).toUpperCase() + keyValue.slice(1);

    // create and return the error
    const err = new AppError(
        400,
        `${key} already exists! Please use a different one`
    );
    return err;
};

const handleJWTError = () => {
    const error = new AppError(
        401,
        'You are not logged in! Please login to continue'
    );
    return error;
};

const errorHandler = (error, req, res, next) => {
    if (process.env.SERVER_ENV === 'development') {
        console.log(error);
    }

    if (!error.isOperational) {
        error.message = 'Something went really bad! Please try again later';
        error.status = 500;
    }

    if (error.name === 'ValidationError') error = handleValidationError();
    if (error.name === 'CastError') error = handleCastError(error);

    if (error.code && error.code === 11000)
        error = handleDuplicatesError(error);

    if (
        error.name === 'JsonWebTokenError' ||
        error.name === 'TokenExpiredError'
    ) {
        error = handleJWTError();
    }

    const statusCode = error.statusCode || 500;
    const message =
        error.message || 'Something went really bad! Please try again later';

    res.status(statusCode).json({ message });
};

export default errorHandler;
