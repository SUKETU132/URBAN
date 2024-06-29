import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import OrderComponent from '../OrderComponent/OrderComponent'
import { useGetOrderItemQuery } from '../../store/cartSlice';

const Orders = () => {

    return (
        <div className='h-full w-full flex justify-center items-start flex-col'>
            <div className='w-[1160px] ml-auto mr-auto mb-4'>
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link
                                to="/"
                                className="ml-1 inline-flex text-sm font-medium text-gray-800 hover:underline md:ml-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="mr-4 h-4 w-4"
                                >
                                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <span className="mx-2.5 text-gray-800 ">/</span>
                                <Link
                                    to="/profile"
                                    className="ml-1 text-sm font-medium text-gray-800 hover:underline md:ml-2"
                                >
                                    My Account
                                </Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <span className="mx-2.5 text-gray-800 ">/</span>
                                <span className="ml-1 text-sm font-medium text-gray-800 hover:underline md:ml-2">
                                    My Orders
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div className='w-full'>
                <div>
                    <OrderComponent />
                </div>
            </div>
        </div>
    )
}

export default Orders
