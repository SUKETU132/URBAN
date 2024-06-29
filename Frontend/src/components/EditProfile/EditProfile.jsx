import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authService from '../../MongoDB/auth';
import LoadingSpinner from "../Loading/LoadingSpinner";

const EditProfilePage = () => {
    const userData = useSelector(state => state.auth.userData);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [isDeactivated, setIsDeactivated] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        mainImage: null,
    });

    useEffect(() => {
        setProfilePic(userData?.data?.profilePic);
        setUsername(userData?.data?.username);
        setFormData({ username: userData?.data?.username, mainImage: null });
    }, [userData]);

    const sendEmailChangeOtp = () => {
         
    }

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
        setFormData({ ...formData, username: value || username });
    };

    const handleProfilePicChange = (event) => {
        setFormData({ ...formData, mainImage: event.target.files[0] });
    };

    const handleSaveChanges = async (event) => {
        event.preventDefault();
        const formDataObj = new FormData();
        formDataObj.append('username', formData.username);
        formDataObj.append('mainImage', formData.mainImage);

        setIsLoading(true);
        try {
            const result = await authService.updateProfile(formDataObj);

            if (result) {
                toast.success(result.message);
                // Update profilePic in state if it's returned from the backend
                if (result.user && result.user.profilePic) {
                    setProfilePic(result.user.profilePic);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {isLoading && <LoadingSpinner />} {/* Show spinner when loading */}
            <div className="w-full bg-white shadow-lg rounded-lg p-8 flex flex-col gap-5">
                <h1 className="text-3xl font-bold mb-6 text-center">Edit Profile</h1>
                {/* Username */}
                <div className="mb-6">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-3"
                    />
                </div>
                {/* Profile Picture */}
                <div className="mb-6 flex items-center">
                    <div className="relative">
                        <label htmlFor="file-upload" className="block text-sm font-medium pb-2 text-gray-700">Profile Picture</label>
                        <div className="mt-1 flex items-center">
                            <div className="flex-shrink-0 mr-4">
                                <img
                                    className="h-12 w-12 rounded-full"
                                    src={profilePic || 'https://via.placeholder.com/150'}
                                    alt="Profile"
                                />
                            </div>
                            <label htmlFor="file-upload" className="relative cursor-pointer p-3 bg-gray-100 rounded-md font-medium text-blue-500 border border-gray-400 hover:text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                <span>Upload a file</span>
                                <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePicChange}
                                    className="sr-only"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <button
                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-slate-800 mr-4"
                        onClick={sendEmailChangeOtp}
                    >
                        Change Email
                    </button>
                    <button
                        className="bg-white text-black border-black px-4 py-2 rounded-md hover:bg-slate-400 mr-4"
                    >
                        Change Password
                    </button>
                </div>

                {/* Deactivate Account */}
                <div className="mb-6 flex gap-2">
                    <input
                        type='checkbox'
                        id="deactivateAccount"
                        label="Deactivate Account"
                        checked={isDeactivated}
                        onChange={() => setIsDeactivated(!isDeactivated)}
                        className="text-sm text-gray-600 cursor-pointer"
                    />
                    <p>Deactivate</p>
                </div>
                {/* Save Changes Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleSaveChanges}
                        className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 mr-4"
                    >
                        Save Changes
                    </button>
                    {/* Deactivate Account Button */}
                    <button
                        className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600"
                    // onClick={handleDeactivateAccount}
                    >
                        Deactivate Account
                    </button>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
        </div>
    );
};

export default EditProfilePage;
