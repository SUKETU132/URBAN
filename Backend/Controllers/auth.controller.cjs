const Address = require("../Models/address.model.cjs");
const uploadOnCloudinary = require("../Utils/FileUpload.cjs");
const User = require("../Models/user.model.cjs");
const jwt = require('jsonwebtoken');
const asyncHandler = require("../Utils/asyncHandler.cjs");
const bcrypt = require('bcryptjs');
const utils = require('util');
const sendEmail = require("../Utils/email.cjs");
const crypto = require('crypto');
const { default: ApiError } = require("../Utils/ApiError.cjs");

// first is payload. second is secret String and header will be automatically created

const signToken = id => {
    // This function takes an `id` as an argument and creates a JWT with that `id`.
    // The JWT payload contains the `id` passed as an argument.
    // The second argument is the secret key used to sign the token.
    // The third argument is an options object, where `expiresIn` specifies the token's expiration time.

    return jwt.sign({ id }, process.env.SUPER_SECRET_STRING, {
        expiresIn: process.env.LOGIN_EXPIRES
    });
}

exports.signup = asyncHandler(async (req, res, next) => {
    try {

        const newUser = await User.create(req.body);
        // json token consists of three 
        /**
         * 1. header: that tells as that which method is used in this.
         * 2. payload: This will store the information like.
         * 3. signature: This will consists of payload, header and secret string.
         */

        const token = signToken(newUser._id);

        res.cookie('token', token, { httpOnly: true, secure: true });

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// For login
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error('Please provide email id and password for login in!');
    }

    const user = await User.findOne({ email }).select('notVerified').select('+password').select('role')

    // to check whether users have verified their email id through otp or not?
    if (user.notVerified) {
        console.log("User is not verified.");
        res.status(200).json({
            status: "success",
            message: "User is not verified.",
            notVerified: true
        });
        return;
    }

    // Check is user exists and password matches
    if (!user || !(await user.checkPassword(password, user.password))) {
        throw new Error("email or password is not valid.");
    }

    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token,
        role: user.role,
        message: "Login successfull.",
        notVerified: false
    });
});

exports.protect = asyncHandler(async (req, res, next) => {
    const newToken = req.headers.authorization;
    let token;
    if (newToken && newToken.startsWith('Bearer')) {
        token = newToken.split(' ')[1];
    }

    console.log("This is free token: ", token);

    if (!token) {
        console.log("This is inside !token", token);
        throw new Error("Invalid authorization token. Please provide a valid token.");
    }

    // 2. validate token
    try {
        const decodedToken = await utils.promisify(jwt.verify)(token, process.env.SUPER_SECRET_STRING);
        token = decodedToken;
    } catch (error) {
        throw new Error("Token has expired.");
    }

    // 3. If user does not exits.
    const user = await User.findById(token.id);
    console.log(user);
    if (!user) throw new Error("The user with given token doen not exits.");

    // 4. If user changed password after the token was issued.
    if (user.isPasswordChanged(token.iat)) {
        throw new Error("The password has been changed recently. Please login again.");
    }

    // 5. Allow user to access route.
    req.user = user;
    next();
});

// Forgot password post req
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    // 1. get the user.
    const { email } = req.body;
    console.log(email)
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("We could not find the user with given email.");
    }

    // 2. generate random reset token.
    const resetToken = user.createResetPasswordToken();

    // Save the values
    await user.save({ validateBeforeSave: false });

    // Creating the url
    const resetUrl = `http://localhost:5173/resetPassword/${resetToken}`;
    // 3. send email to the user with reset token.
    const message = `We have received a password request. 
    Please use the below link to reset your password\n\n
    ${resetUrl}\n\nThis reset password will be valid only for 10 minutes.`
    try {
        await sendEmail({
            email: user.email,
            subject: 'Password change request received',
            message: message,
        });

        res.status(200).json({
            status: true,
            message: "password reset link send to user email"
        });

    } catch (error) {
        user.PasswordResetToken = undefined;
        user.PasswordResetTokenExpires = undefined;
        user.save({ validateBeforeSave: false });

        throw new Error("There was an error sending password reset email. Please try again later");
    }
});

// Reset the possword
exports.resetPassword = asyncHandler(async (req, res, next) => {
    // 1. Receive the token from the email link
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({ PasswordResetToken: token, PasswordResetTokenExpires: { $gt: Date.now() } });

    // Check if user is exists or not (There are two reason if passwordChangedAt is not greter than current data 
    //  then user will be assigned to undefind if token is not found )
    if (!user) {
        throw new Error("Token has expired or it is invalid token.");
    }

    // If user is exists then 
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.PasswordResetTokenExpires = undefined;
    user.PasswordResetToken = undefined;
    user.PasswordChangedAt = Date.now();

    await user.save();
    const loginToken = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token: loginToken,
        message: "Password reset successfully.",
    })
});

// sending mail for otp verification
exports.getVarified = async (req, res) => {
    const { emailId } = req.body;
    const user = await User.findOne({ email: emailId });
    if (!user) throw new ApiError("User not found");

    // Generate otp for user email verification
    let otp = await user.generateOtp();

    await user.save({ validateBeforeSave: false });

    let message = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f9f9f9;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #f67d30;
                text-align: center;
            }
            .content {
                margin-top: 20px;
                text-align: center;
            }
            .otp-code {
                font-size: 24px;
                background-color: #f67d30;
                color: #ffffff;
                padding: 10px 20px;
                border-radius: 5px;
                display: inline-block;
            }
            .note {
                margin-top: 20px;
                font-style: italic;
                color: #666666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>URBAN VOGUE</h1>
            <div class="content">
                <p>Dear User,</p>
                <p>Thank you for registering with URBAN VOGUE. Your OTP for email verification is:</p>
                <div class="otp-code">${otp}</div>
                <p>Please use this OTP to verify your email address and complete your registration process.</p>
                <p class="note">Note: This OTP is valid for a limited time.</p>
            </div>
        </div>
    </body>
    </html>
`;


    try {
        sendEmail({
            email: user.email,
            subject: 'Verify your email',
            message: message,
        });

        res.status(200).json({
            status: true,
            message: "otp send to user email"
        });

    } catch (error) {
        user.otp = undefined;
        user.save({ validateBeforeSave: false });
        throw new Error("There was an error sending password otp email. Please try again later");
    }
}

exports.verifyOtp = async (req, res) => {
    const { userOtp } = req.body;

    try {
        // Find OTP
        const hashedOtp = crypto.createHash('sha256').update(userOtp).digest('hex');
        const user = await User.findOne({ otp: hashedOtp });

        // If user not found
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user) {
            user.notVerified = false;
            user.otp = undefined;
            await user.save({ validateBeforeSave: false });
            return res.status(200).json({ success: true, message: "OTP verification successful" });
        } else {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }
    } catch (error) {
        console.error("OTP verification error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

exports.deleteMe = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: 'success',
        data: null,
    });
});

exports.getCurrentUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)
        .select("profilePic username email notVerified role -_id");

    res.status(200).json({
        status: true,
        data: user,
        notVerified: user.notVerified,
    });
});


exports.updateProfile = async (req, res, next) => {
    const userId = req.user.id;
    const { username } = req.body;
    const mainImageFile = req.file;

    if (!mainImageFile) {
        return res.status(400).json({ message: 'Main image is required' });
    }

    if (!username) {
        return res.status(400).json({ error: 'At least one field (username, profilePic) must be provided for update.' });
    }

    try {
        const user = await User.findById(userId).select("profilePic username");

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const mainImageResult = await uploadOnCloudinary(mainImageFile.path);

        if (!mainImageResult) {
            return res.status(500).json({ message: 'Failed to upload main image to Cloudinary' });
        }

        if (username) user.username = username;
        if (mainImageResult.url) user.profilePic = mainImageResult.url;

        await user.save({ validateBeforeSave: false });
        const updatedUser = user.toObject();
        delete updatedUser._id;
        res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.createAddress = async (req, res) => {
    try {
        const address = new Address({
            ...req.body,
            owner: req.user.id
        });
        await address.save();
        res.status(201).json({ success: true, message: "Address save successully." });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: error.message });
    }
};

// for changing the email.(Send the otp to the user email)
exports.changeEmailVerificationOtpReq = async (req, res) => {
    const { emailId } = req.body;
    const user = await User.findOne({ email: emailId });
    if (!user) throw new ApiError("User not found");

    // Generate otp for user email verification
    let changeEmailVerificationOtp = await user.generateOtpForChangingEmail();

    await user.save({ validateBeforeSave: false });

    let message = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f9f9f9;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #f67d30;
                text-align: center;
            }
            .content {
                margin-top: 20px;
                text-align: center;
            }
            .otp-code {
                font-size: 24px;
                background-color: #f67d30;
                color: #ffffff;
                padding: 10px 20px;
                border-radius: 5px;
                display: inline-block;
            }
            .note {
                margin-top: 20px;
                font-style: italic;
                color: #666666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>URBAN FURNIX</h1>
            <div class="content">
                <p>Dear User,</p>
                <p>we have received email change request use this otp to change the email.</p>
                <div class="otp-code">${changeEmailVerificationOtp}</div>
                <p>Please use this OTP to change your email address and complete your process.</p>
                <p class="note">Note: This OTP is valid for a limited time.</p>
            </div>
        </div>
    </body>
    </html>
`;

    try {
        sendEmail({
            email: user.email,
            subject: 'Verify your email',
            message: message,
        });

        res.status(200).json({
            status: true,
            message: "otp send to user email"
        });

    } catch (error) {
        user.changeEmailVerificationOtp = undefined;
        user.save({ validateBeforeSave: false });
        throw new Error("There was an error sending password otp email. Please try again later");
    }
}

exports.changeEmailVerifyOtp = async (req, res) => {
    const { userOtp } = req.body;

    try {
        // Find OTP
        const hashedOtp = crypto.createHash('sha256').update(userOtp).digest('hex');
        const user = await User.findOne({ changeEmailVerificationOtp: hashedOtp });

        // If user not found
        if (!user) {
            return res.status(404).json({ changeEmailSuccess: false, message: "User not found" });
        }

        if (user) {
            user.changeEmailVerificationOtp = undefined;
            await user.save({ validateBeforeSave: false });
            return res.status(200).json({ changeEmailSuccess: true, message: "email change OTP verification successful" });
        } else {
            return res.status(400).json({ changeEmailSuccess: false, message: "Invalid OTP" });
        }
    } catch (error) {
        console.error("OTP verification error:", error);
        return res.status(500).json({ changeEmailSuccess: false, message: "Internal server error" });
    }
}

exports.changeRole = asyncHandler(async (req, res) => {
    console.log("Api is hit for role")
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) return res.status(401).json({ message: "User not found", success: false });

        user.role = "admin";
        await user.save({ validateBeforeSave: false });
        res.status(200).json({ success: true, message: "Role changed successfully." })
    } catch (error) {
        res.status(500).json({ success: false, message: "internel server error" })
    }
});
