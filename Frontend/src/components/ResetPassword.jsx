import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import authService from '../MongoDB/auth';
import LoadingSpinner from './Loading/LoadingSpinner';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsLoading(true);
        try {
            const result = await authService.handlePasswordReset({ password, confirmPassword, token });
            if (result.message && result.success) {
                setMessage(result.message);
                dispatch(logout());
                navigate('/login');
            } else {
                throw new Error('Failed to reset password');
            }
        } catch (error) {
            console.error('Error resetting password:', error.message);
            setMessage('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {isLoading && <LoadingSpinner />}
            <div className="max-w-md w-full p-8 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
                {message && <p className="text-red-500 text-center mb-4">{message}</p>}
                <form onSubmit={handlePasswordReset}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">New Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">Confirm New Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-400 transition duration-300">Reset Password</button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;


