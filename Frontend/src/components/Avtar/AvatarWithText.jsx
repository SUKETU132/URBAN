import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const AvatarWithText = ({ profilePic, username }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false); 
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = () => {
        setIsOpen(false);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <div className="relative">
                {!imageLoaded && (
                    <div className="h-12 w-12 animate-pulse bg-gray-200 rounded-full"></div>
                )}
                <img
                    className={`inline-block h-12 w-12 rounded-full cursor-pointer ${imageLoaded ? '' : 'hidden'}`}
                    src={profilePic}
                    alt="Profile"
                    onClick={toggleDropdown}
                    onLoad={handleImageLoad}
                />
                {isOpen && (
                    <div className='flex justify-center items-center'>
                        <div className="absolute mt-[170px] w-48 bg-white shadow-lg rounded-lg py-2 z-10">
                            <div className="px-4">
                                <span className="block text-sm text-center font-medium text-gray-900 py-2">{username}</span>
                                <div className="border-t border-gray-200"></div>
                                <Link to="/profile/edit-profile" onClick={handleItemClick} className="flex gap-1 items-center justify-center py-2 text-sm text-blue-500 hover:bg-gray-100 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path></svg>
                                    My Profile
                                </Link>
                                <div className="border-t border-gray-200"></div>
                                <Link to="/profile/orders" onClick={handleItemClick} className="flex gap-1 items-center justify-center py-2 text-sm text-blue-500 hover:bg-gray-100 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.0007 1.20825 18.3195 3.68108 20.7923 4.99992 18.3195 6.31876 17.0007 8.79159 15.6818 6.31876 13.209 4.99992 15.6818 3.68108 17.0007 1.20825ZM10.6673 9.33325 15.6673 11.9999 10.6673 14.6666 8.00065 19.6666 5.33398 14.6666.333984 11.9999 5.33398 9.33325 8.00065 4.33325 10.6673 9.33325ZM11.4173 11.9999 9.18905 10.8115 8.00065 8.58325 6.81224 10.8115 4.58398 11.9999 6.81224 13.1883 8.00065 15.4166 9.18905 13.1883 11.4173 11.9999ZM19.6673 16.3333 18.0007 13.2083 16.334 16.3333 13.209 17.9999 16.334 19.6666 18.0007 22.7916 19.6673 19.6666 22.7923 17.9999 19.6673 16.3333Z"></path></svg>
                                    Orders
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvatarWithText;
