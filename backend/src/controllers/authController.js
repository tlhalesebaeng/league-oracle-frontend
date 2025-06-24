import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { compare } from 'bcrypt';
import User from '../models/userModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../AppError.js';

const assignToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const sendToken = asyncHandler(async (res, statusCode, user) => {
    // generate the token
    const token = assignToken(user._id);

    // create and add the cookie to the response
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    if (process.env.SERVER_ENV === 'production') cookieOptions.secure = true;

    // add the token to the cookies
    res.cookie('access_jwt', token, cookieOptions);

    // remove the password field from the user data
    user.password = undefined;

    // send the response
    res.status(statusCode).json({ user });
});

export const signup = asyncHandler(async (req, res) => {
    // create the user
    const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    // send the token to login the user
    sendToken(res, 201, user);
});

export const login = asyncHandler(async (req, res, next) => {
    // verify if all details are provided
    if (!req.body || !req.body.email || !req.body.password) {
        const error = new AppError(400, 'All fields are required');
        return next(error);
    }

    // get the user
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        const error = new AppError(
            400,
            'Invalid credentials. Please check your email or password and try again.'
        );
        return next(error);
    }

    // compare the passwords
    const passwordsMatch = await compare(req.body.password, user.password);
    if (!passwordsMatch) {
        const error = new AppError(
            400,
            'Invalid credentials. Please check your email or password and try again.'
        );
        return next(error);
    }

    // send the token as a cookie together with the response
    sendToken(res, 200, user);
});

export const logout = asyncHandler(async (req, res, next) => {
    const cookieOptions = {
        expires: new Date(Date.now() - 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    res.cookie('access_jwt', '', cookieOptions);
    res.status(204).json(null);
});

export const checkAuth = asyncHandler(async (req, res, next) => {
    if (!req.cookies || !req.cookies.access_jwt) {
        return res.status(400).json({
            isAuth: false,
        });
    }

    const token = req.cookies.access_jwt;

    // verify the token and get the payload
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // check if the user still exists
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
        res.status(400).json({
            isAuth: false,
        });
    }

    res.status(200).json({
        isAuth: true,
        user,
    });
});

export const checkHealthStatus = asyncHandler(async (req, res) => {
    res.status(200).json({status: 'healthy'})
})

export const protect = asyncHandler(async (req, res, next) => {
    // check if the token exists and get it
    if (!req.cookies || !req.cookies.access_jwt) {
        const error = new AppError(
            401,
            'You are not logged in! Please login to continue.'
        );
        return next(error);
    }
    const token = req.cookies.access_jwt;

    // verify the token and get the payload
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // check if the user still exists
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
        const error = new AppError(
            401,
            'User does not exist! Please create a new account.'
        );
        return next(error);
    }

    // check if the user changed the password after the token was issued (still to implement)

    // grant the user access
    req.user = user;
    next();
});
