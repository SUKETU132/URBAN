import conf from "../config/config";
import axios from "axios";

// will keep code encaspulate so letter on if we want to change database service then we can change in one file easily.

class AuthService {
    async createAccount({ username, email, password, confirmPassword }) {
        try {
            const response = await axios.post(conf.mongoRegisterUrl, {
                username,
                email,
                password,
                confirmPassword,
            });

            if (response.data) {
                localStorage.setItem("token", response.data.token);
                return true;
            } else {
                return false;
            }

        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const response = await axios.post(conf.mongoLoginUrl, {
                email,
                password
            });
            console.log(response.data);
            if (response.data && !response.data.notVerified) {
                localStorage.setItem("token", response.data.token);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw error;
        }
    }

    async sendOtp({ email }) {

        try {
            const response = await axios.post(conf.mongoOtpUrl, {
                emailId: email
            });

            if (response.status === 200) {
                return { success: true, message: "Otp sent successfuly." };
            } else {
                throw new Error('Failed to send OTP email');
            }
        } catch (error) {
            console.error('Error sending OTP email:', error.message);
            throw new Error('An error occurred while sending OTP email. Please try again later.');
        }
    }

    async verifyOtp({ otp }) {
        try {
            const response = await axios.post(conf.mongoVerifyOtpUrl, {
                userOtp: otp
            });

            if (response.status === 200 && response.data.success) {
                return { success: true, message: response.data.message };
            } else {
                throw new Error(response.data.message || 'Failed to verify OTP');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error.message);
            throw new Error('An error occurred while verifying OTP. Please try again later.');
        }
    }

    async requestPasswordReset({ email }) {
        try {
            const response = await axios.post(conf.mongoForgotpasswordUrl, {
                email
            });

            if (response.status === 200 && response.data.status) {
                return { success: true, message: response.data.message };
            } else {
                throw new Error(response.data.message || 'Failed to send password reset link');
            }
        } catch (error) {
            console.error('Error requesting password reset:', error.message);
            throw new Error('An error occurred while requesting password reset. Please try again later.');
        }
    }

    async changeEmailSendOtp({ email }) {
        try {

        } catch (error) {

        }
    }

    async handlePasswordReset({ password, confirmPassword, token }) {

        if (password !== confirmPassword) {
            return { message: 'Passwords do not match' };
        }
        try {

            const response = await axios.patch(`${conf.mongoResetpasswordUrl}/${token}`, { password, confirmPassword });
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                return { message: response.data.message, success: true };
            } else {
                throw new Error(response.data.message || 'Failed to reset password');
            }
        } catch (error) {
            console.error('Error resetting password:', error.message);
            throw new Error({ message: 'An error occurred. Please try again.' });
        }
    };

    async getCurrentUser() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Login First');
            }
            const response = await axios.get(conf.mongoGetCurrentUserUrl, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error("Login first");
            return null;
        }
    }

    async updateProfile(formDataObj) {
        try {
            const token = localStorage.getItem('token');
            if (!token) return null;

            const response = await axios.put(conf.mongoUpdateProfile, formDataObj, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            const result = response.data;
            console.log("this is the result:", result);

            return result;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    }

    async changeRole() {
        try {
            const token = localStorage.getItem('token');
            if (!token) return null;

            const response = await axios.patch(conf.mongoChangeRoleUrl, {}, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            
            const result = response.data;
            if (result) return result;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    }
};

const authService = new AuthService();

export default authService;