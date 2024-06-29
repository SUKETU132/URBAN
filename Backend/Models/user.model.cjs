const mongoose = require("mongoose");
const validator = require("validator");
const ApiError = require("../Utils/ApiError.cjs");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
    profilePic: {
        type: String,
        default: "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
    },
    username: {
        type: String,
        required: [true, "Please enter you name."],
    },
    email: {
        type: String,
        required: [true, "Please enter your email."],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email.']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password.'],
        minlength: 8,
        select: false,
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password.'],
        // It will only work for save and create.
        validate: {
            validator: function (value) {
                return value === this.password // Here "this" is refering to the this documnet's password. 
            },
            message: 'password and confirm password does not match.'
        }
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
    notVerified: {
        type: Boolean,
        default: true,
        select: false,
    },
    changeEmailVerificationOtp: String,
    otp: String,
    PasswordChangedAt: Date,
    PasswordResetToken: String,
    PasswordResetTokenExpires: Date,
}, { timestamps: true });

// For encrypting password before saving
userSchema.pre('save', async function (next) {
    // This will return true if password is modified. 
    // Suppose user want to update name only then we don't need to encrypt password again.  
    if (!this.isModified('password')) {
        return next();
    }
    try {
        // It is also called hashing the password. Use await because this is async version and return the promise.
        this.password = await bcrypt.hash(this.password, 12);
        this.confirmPassword = undefined;
        next();
    } catch (error) {
        throw new ApiError(error);
    }
});

// This will return the boolean value
userSchema.methods.checkPassword = async function (pass, passDB) {
    return await bcrypt.compare(pass, passDB);
}

userSchema.methods.isPasswordChanged = function (jwtPassword) {
    if (this.PasswordChangedAt) {
        const pswdChangedTimestamp = parseInt(this.PasswordChangedAt.getTime() / 1000, 10);  // 10 is for base 10.
        console.log(pswdChangedTimestamp, jwtPassword);
        return jwtPassword < pswdChangedTimestamp;
    }
    return false;
}

userSchema.methods.createResetPasswordToken = function () {

    // using crypto hash method to generate To generate the random token for reseting the password. 
    const resetToken = crypto.randomBytes(32).toString('hex');

    // This is the algorithm for hashing the token (Means encrypt the token)
    this.PasswordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.PasswordResetTokenExpires = Date.now() + 10 * 60 * 1000;  // token will expires in 10 min so it is conevretion of the time into mili second.

    // Now plan token will be sent to user and encrypted token will be stored in the data base  For comparing letter
    console.log(resetToken, this.PasswordResetToken);

    return resetToken;  // A password reset token that is sent to the user should not be encrypted, it should be plain.
}

userSchema.methods.generateOtp = async function () {
    let otp = `${Math.floor(100000 + Math.random() * 900000)}`; // Generates a 6-digit OTP
    this.otp = crypto.createHash('sha256').update(otp).digest('hex');
    return otp;
}

userSchema.methods.generateOtpForChangingEmail = async function () {
    let changeEmailVerificationOtp = `${Math.floor(100000 + Math.random() * 900000)}`; // Generates a 6-digit OTP
    this.changeEmailVerificationOtp = crypto.createHash('sha256').update(changeEmailVerificationOtp).digest('hex');
    return changeEmailVerificationOtp;
}

userSchema.pre(/^find/, function (next) {
    // This keyword in the function will point to current query
    this.find({ active: { $ne: false } });
    next();
});

const userModel = new mongoose.model("userModel", userSchema);

module.exports = userModel;
