import React, { useState } from 'react';
import authService from "../MongoDB/auth";
import Input from '../Input';
import { useNavigate } from 'react-router-dom';

const OTPVerification = ({ email }) => {
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSendOtp = async () => {
        setSuccess("");
        setError("");
        try {
            const response = await authService.sendOtp({ email });

            if (response.success) {
                setOtpSent(true);
                setSuccess(response.message);
                setError('');
            } else {
                setError('Failed to send OTP email');
                setSuccess('');
            }
        } catch (error) {
            console.error('Error sending OTP email:', error.message);
            setError('An error occurred while sending OTP email. Please try again later.');
            setSuccess('');
        }
    };

    const handleVerifyOtp = async () => {
        setSuccess("");
        setError("");
        try {
            const response = await authService.verifyOtp({ otp });

            if (response.success) {
                setSuccess(response.message);
                setError('');
                navigate('/');
            } else {
                setError(response.message);
                setSuccess('');
            }
        } catch (error) {
            console.error('OTP verification error:', error.message);
            setError('An error occurred while verifying OTP. Please try again later.');
            setSuccess('');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-gray-200 shadow-md">
                <h2 className="text-center text-2xl font-bold leading-tight">OTP Verification</h2>
                <p className="mt-2 text-center text-base text-gray-600">
                    Please enter the OTP sent to your email.
                </p>

                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
                {success && <p className="text-green-600 mt-4 text-center">{success}</p>}

                {!otpSent ? (
                    <div className="mt-6">
                        <button
                            onClick={handleSendOtp}
                            className="w-full bg-blue-500 text-white py-2 rounded-lg transition-all duration-200 hover:bg-blue-600"
                        >
                            Send OTP
                        </button>
                    </div>
                ) : (
                    <div className="mt-6">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">OTP:</label>
                            <Input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <button
                            onClick={handleVerifyOtp}
                            className="w-full bg-green-500 text-white py-2 rounded-lg transition-all duration-200 hover:bg-green-600"
                        >
                            Verify OTP
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OTPVerification;
