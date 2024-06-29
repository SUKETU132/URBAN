import React, { useEffect } from 'react';
import { MapPin, Edit, LogIn, ListOrdered } from 'lucide-react';
import { Link, useNavigate, Outlet, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

export default function SidebarThree() {
    const authStatus = useSelector(state => state.auth.status);
    const userData = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!authStatus) {
            navigate("/login");
        }
    }, [authStatus, navigate]);

    const handleLogoutAndRedirect = () => {
        dispatch(logout());
        navigate("/login");
    };

    const isActive = (path) => location.pathname.includes(path);

    return (
        <div className="flex">
            <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-white px-5 py-8">
                <Link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" version="1" id="cloth">
                        <path fill="#f37a5d" fillRule="evenodd" d="M32 16c0 8.824-7.176 16-16 16S0 24.824 0 16 7.176 0 16 0s16 7.176 16 16z" clipRule="evenodd"></path>
                        <path d="M18.273 31.77c.313-.045.642-.033.948-.096a15.868 15.868 0 0 0 5.718-2.41 16.12 16.12 0 0 0 5.801-7.041c.406-.957.72-1.962.934-3.002.039-.19.026-.396.058-.588L20.537 7.438a.326.326 0 0 0-.082-.063l-1.336-.363-.668-.668v.12l-.181.73-.487-.487H15.78l.098.402-.766-.765-.91.547h-.06l-1.336.484c-.122.06-.243.183-.182.365l-2.732 5.645c-.061.06-.061.183 0 .304l2.671 5.89c.014.025.03.048.05.067l.355.356H12.38l-.79 4.857a.289.289 0 0 0-.009.147c.003.017.012.03.018.047a.26.26 0 0 0 .043.076c.005.006.006.016.011.021l6.62 6.62z" opacity=".25"></path>
                        <path fill="#fff" d="M18.451 6.344v.12l-1.396 5.586v13.113c0 .182-.122.303-.304.303s-.303-.182-.303-.303V11.868l-1.336-5.403v-.121l-.91.546h-.061l-1.336.486c-.121.06-.243.182-.182.364l-2.732 5.646c-.06.06-.06.182 0 .303l2.671 5.889c.122.243.547.182.547-.06.303-1.276.303-2.186.607-2.915h1.335c.183 0 .304.122.304.304l-.06 2.124c0 .061 0 .122-.061.183l-.547.667a.46.46 0 0 1-.243.122h-2.063l-.79 4.856c-.06.183.06.365.243.365 3.035.546 6.192.607 9.41 0 .182-.061.242-.182.242-.365-.242-1.578-.424-3.278-.667-4.917h-2.125c-.122 0-.182-.06-.243-.121l-.546-.668c-.061-.06-.061-.122-.061-.182l-.06-2.125c0-.182.181-.304.303-.304h1.457c.182 1.032.425 2.064.485 3.097 0 .182.183.303.304.303h1.518c.182 0 .303-.182.303-.303-.303-4.007-.182-8.257-1.517-11.838.06-.183-.061-.365-.183-.425L19.12 7.01l-.668-.667zm-.668.364H15.78l.971 4.006 1.032-4.006zm-4.674 5.646c.425.91.668 1.942.364 3.278l-.971-2.186.607-1.092z"></path>
                    </svg>
                </Link>
                <div className="mt-6 flex flex-1 flex-col justify-between">
                    <nav className="-mx-3 space-y-6">
                        <div className="space-y-3">
                            <label className="px-3 text-xs font-semibold uppercase text-gray-900">ACCOUNT SETTINGS</label>
                            <Link
                                className={`flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 ${isActive('/profile/edit-profile') ? 'bg-gray-100 text-gray-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'}`}
                                to="/profile/edit-profile"
                            >
                                <Edit className="h-5 w-5" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Edit Profile</span>
                            </Link>
                            <Link
                                className={`flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 ${isActive('/profile/orders') ? 'bg-gray-100 text-gray-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'}`}
                                to="/profile/orders"
                            >
                                <ListOrdered className="h-5 w-5" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Order</span>
                            </Link>
                            <Link
                                className={`flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 ${isActive('/profile/address') ? 'bg-gray-100 text-gray-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'}`}
                                to="/profile/address"
                            >
                                <MapPin className="h-5 w-5" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Manage Address</span>
                            </Link>
                        </div>
                    </nav>
                    <div className="mt-6">
                        <div className="rounded-lg bg-gray-100 p-3">
                            <h2 className="text-sm font-medium text-gray-800">New feature available!</h2>
                            <p className="mt-1 text-xs text-gray-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus harum officia eligendi velit.
                            </p>
                            <img
                                className="mt-2 h-32 w-full rounded-lg object-cover"
                                src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1806&q=80"
                                alt="Feature"
                            />
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <a href="#" className="flex items-center gap-x-2">
                                <img
                                    className="h-7 w-7 rounded-full object-cover"
                                    src={userData?.data?.profilePic}
                                    alt="avatar"
                                />
                                <span className="text-sm font-medium text-gray-700">{userData?.data?.username}</span>
                            </a>
                            <a
                                href="#"
                                className="rotate-180 text-gray-800 transition-colors duration-200 hover:text-gray-900"
                                onClick={handleLogoutAndRedirect}
                            >
                                <LogIn className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </aside>
            <aside className="w-full flex justify-center items-start">
                <Outlet />
            </aside>
        </div>
    );
}
