import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import "./Header.css"

function LogoutBtn() {
    const dispatch = useDispatch();
    function handleLogout() {
        dispatch(logout());
        localStorage.removeItem("token");
    }
    return (
        <div>
            <button
                className='op inline-bock px-7 py-3 hover:bg-gray-200 duration-200 rounded-full'
                onClick={handleLogout}
            >Logout</button>
        </div >
    )
}

export default LogoutBtn
