import React, { useEffect, useRef, useState } from 'react';
import { useGSAP } from "@gsap/react";
import { gsap } from 'gsap';
import Catagories from "../Categories/Catagories";
import "./Header.css";
import { Link } from 'react-router-dom';
import LogoutBtn from './LogoutButton';
import ResponsiveBar from "./ResponsiveBar";
import Button from '../../Button';
import { useSelector } from 'react-redux';
import { useGetCartItemQuery } from '../../store/cartSlice';
import AvatarWithText from '../Avtar/AvatarWithText';
import authService from '../../MongoDB/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const [isresponsiveMenu, setisResponsiveMenu] = useState(false);
    const [isShop, setIsShop] = useState(false);
    const gsapRef = useRef();
    const menu = useRef();
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const { data } = useGetCartItemQuery();
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        setTotalQuantity(data?.items?.length);
    }, [data]);

    useGSAP(() => {
        gsap.from(gsapRef.current, {
            opacity: 0,
            y: -35,
            duration: 0.7,
            delay: 0.5,
            stagger: 0.3
        });
    });

    useEffect(() => {
        if (isresponsiveMenu) {
            gsap.from(menu.current, {
                opacity: 0,
                y: -100,
                duration: 0.4,
                delay: 0.3,
                stagger: 0.3
            });
        }
    }, [isresponsiveMenu]);


    const handleAdmin = async () => {
        try {
            const result = await authService.changeRole();
            console.log(result);
            if (result.success) {
                toast.success(result.message);
            }
        } catch (error) {
            toast.error(result.message);
            throw new Error(error);
        }
    }

    return (
        <div>
            <header>
                {isresponsiveMenu ? (
                    <div className='top-header'>
                        <div ref={menu} className='responsive-bar fixed flex justify-center items-center  w-full bg-white z-8'>
                            <div onClick={() => setisResponsiveMenu(false)} className='fixed right-4 top-4'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg></div>
                            <ResponsiveBar />
                        </div>
                    </div>) :
                    (<nav className='Navbar' ref={gsapRef}>
                        <div className='Subnav mr-auto ml-auto h-full' id='op'>
                            <Link className='flex justify-center items-center space-x-2' to="/" onClick={() => setIsShop(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" version="1" id="cloth">
                                    <path fill="#f37a5d" fillRule="evenodd" d="M32 16c0 8.824-7.176 16-16 16S0 24.824 0 16 7.176 0 16 0s16 7.176 16 16z" clipRule="evenodd"></path>
                                    <path d="M18.273 31.77c.313-.045.642-.033.948-.096a15.868 15.868 0 0 0 5.718-2.41 16.12 16.12 0 0 0 5.801-7.041c.406-.957.72-1.962.934-3.002.039-.19.026-.396.058-.588L20.537 7.438a.326.326 0 0 0-.082-.063l-1.336-.363-.668-.668v.12l-.181.73-.487-.487H15.78l.098.402-.766-.765-.91.547h-.06l-1.336.484c-.122.06-.243.183-.182.365l-2.732 5.645c-.061.06-.061.183 0 .304l2.671 5.89c.014.025.03.048.05.067l.355.356H12.38l-.79 4.857a.289.289 0 0 0-.009.147c.003.017.012.03.018.047a.26.26 0 0 0 .043.076c.005.006.006.016.011.021l6.62 6.62z" opacity=".25"></path>
                                    <path fill="#fff" d="M18.451 6.344v.12l-1.396 5.586v13.113c0 .182-.122.303-.304.303s-.303-.182-.303-.303V11.868l-1.336-5.403v-.121l-.91.546h-.061l-1.336.486c-.121.06-.243.182-.182.364l-2.732 5.646c-.06.06-.06.182 0 .303l2.671 5.889c.122.243.547.182.547-.06.303-1.276.303-2.186.607-2.915h1.335c.183 0 .304.122.304.304l-.06 2.124c0 .061 0 .122-.061.183l-.547.667a.46.46 0 0 1-.243.122h-2.063l-.79 4.856c-.06.183.06.365.243.365 3.035.546 6.192.607 9.41 0 .182-.061.242-.182.242-.365-.242-1.578-.424-3.278-.667-4.917h-2.125c-.122 0-.182-.06-.243-.121l-.546-.668c-.061-.06-.061-.122-.061-.182l-.06-2.125c0-.182.181-.304.303-.304h1.457c.182 1.032.425 2.064.485 3.097 0 .182.183.303.304.303h1.518c.182 0 .303-.182.303-.303-.303-4.007-.182-8.257-1.517-11.838.06-.183-.061-.365-.183-.425L19.12 7.01l-.668-.667zm-.668.364H15.78l.971 4.006 1.032-4.006zm-4.674 5.646c.425.91.668 1.942.364 3.278l-.971-2.186.607-1.092z"></path>
                                </svg>
                                <h1 className='Nav-h1' id='navh1'>URBAN FURNIX</h1>
                            </Link>
                            <Catagories
                                isShop={isShop}
                                setIsShop={setIsShop}
                            />
                            <ul className="flex justify-center space-x-4 items-center list-none">
                                {!(userData?.data?.role === 'admin') && (
                                    <li>
                                        <button
                                            onClick={handleAdmin}
                                            className='flex flex-raw gap-1'>
                                            <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/Store-9eeae2.svg" alt="Become a Seller" class="_1XmrCc" />
                                            Become Seller</button>
                                    </li>
                                )}
                                {userData?.data?.role === 'admin' && (
                                    <li>
                                        <Link to="/admin">Admin</Link>
                                    </li>
                                )}
                                <li>
                                    {!authStatus ? <Link to={"/login"}><Button className='op inline-block px-7 py-3 hover:bg-gray-200 duration-200 rounded-full ' textColor='text-black'>Login</Button></Link> : <LogoutBtn />}
                                </li>
                                <li className='cursor-pointer'>
                                    <Link to="/cart">
                                        <svg className="go414717972" width="28" height="28" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.9987 14.6668C6.36689 14.6668 6.66536 14.3684 6.66536 14.0002C6.66536 13.632 6.36689 13.3335 5.9987 13.3335C5.63051 13.3335 5.33203 13.632 5.33203 14.0002C5.33203 14.3684 5.63051 14.6668 5.9987 14.6668Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M13.3346 14.6668C13.7028 14.6668 14.0013 14.3684 14.0013 14.0002C14.0013 13.632 13.7028 13.3335 13.3346 13.3335C12.9664 13.3335 12.668 13.632 12.668 14.0002C12.668 14.3684 12.9664 14.6668 13.3346 14.6668Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M0.667969 0.666504H3.33464L5.1213 9.59317C5.18226 9.9001 5.34924 10.1758 5.593 10.372C5.83676 10.5683 6.14177 10.6725 6.45464 10.6665H12.9346C13.2475 10.6725 13.5525 10.5683 13.7963 10.372C14.04 10.1758 14.207 9.9001 14.268 9.59317L15.3346 3.99984H4.0013" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M2 30.5L8.25 24.25M14.5 18L8.25 24.25M8.25 24.25L14.5 30.5L2 18" stroke="currentColor"></path>
                                            <circle className="go3988220986" cx="15.1653" cy="2.83331" r="2.83331" fill="#9FF97F"></circle>
                                        </svg>
                                        <div className="nav-cart-count">{totalQuantity || 0}</div>
                                    </Link>
                                </li>
                                {authStatus && <li><AvatarWithText profilePic={userData?.data?.profilePic} username={userData?.data?.username} /></li>}
                            </ul>
                            <div id="menu-bar" onClick={() => setisResponsiveMenu(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35" fill="currentColor">
                                    <path d="M16 18V20H5V18H16ZM21 11V13H3V11H21ZM19 4V6H8V4H19Z"></path>
                                </svg>
                            </div>
                        </div>
                    </nav>)
                }
            </header>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
        </div>
    );
}

export default Header;
