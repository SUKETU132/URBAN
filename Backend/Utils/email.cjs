const asyncHandler = require("./asyncHandler.cjs");
const nodemailer = require('nodemailer');
const CompanyDetail = require("../Config/env.cjs");

const sendEmail = asyncHandler(async (options) => {
    // Creating the transportation
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: CompanyDetail.EMAIL,
            pass: CompanyDetail.PASSWORD,
        }
    });

    // Define email that what you want to send to the user.
    const emailOption = {
        from: CompanyDetail.EMAIL,
        to: options.email,
        subject: options.subject,
        html: options.message,
    }

    await transporter.sendMail(emailOption);
});

module.exports = sendEmail;