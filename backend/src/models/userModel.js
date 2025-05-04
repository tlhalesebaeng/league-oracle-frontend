import { Schema, model } from 'mongoose';
import { genSalt, hash } from 'bcrypt';
import validator from 'validator';

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name required! Please provide a first name.'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name required! Please provide a last name.'],
    },
    email: {
        type: String,
        required: [true, 'Email required! Please provide an email.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password required! Please provide a password.'],
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Password confirm required! Please confirm password.'],
        validate: {
            // this only runs on create and save middlewares
            validator: function (val) {
                return val === this.password;
            },
            message: 'Passwords do not match! Please re-confirm your password.',
        },
    },
});

// password hashing
userSchema.pre('save', async function (next) {
    // execute the code below this only if the password field has been changed (also runs when the document is new)
    if (!this.isModified('password')) return next();

    // hash the password
    const salt = await genSalt(12);
    this.password = await hash(this.password, salt);

    // exclude the password confirm field
    this.passwordConfirm = undefined;

    next();
});

const User = model('User', userSchema);

export default User;
