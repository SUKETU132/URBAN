import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useGetCartItemQuery } from '../store/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import productService from '../MongoDB/config';
import "./css/ShopCategory.css";

export default function ShoppingCart() {

    const { data, isLoading, refetch } = useGetCartItemQuery();
    const [cartLoadingStates, setCartLoadingStates] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        refetch();
    }, [refetch]);

    useEffect(() => {
        const totalPrices = Array.isArray(data?.items) ? data.items.reduce((acc, item) => {
            if (item.productId && item.productId.price && item.quantity) {
                const itemTotal = item.productId.price * item.quantity;
                acc += itemTotal;
            }
            return acc;
        }, 0) : 0;

        setTotalPrice(totalPrices);
    }, [data]);

    const generateKey = (productId, size) => `${productId}_${size}`;

    const handleRemoveFromCart = async (item) => {
        const key = generateKey(item?.productId?._id, item?.size);
        try {
            setCartLoadingStates(prevStates => ({ ...prevStates, [key]: true }));
            await productService.decrementQuantity({ productId: item?.productId?._id, size: item?.size });
            refetch();
            setCartLoadingStates(prevStates => ({ ...prevStates, [key]: false }));
        } catch (error) {
            console.error("Mongo :: Error :: ", error);
            toast.error('Failed to decrement.');
            setCartLoadingStates(prevStates => ({ ...prevStates, [key]: false }));
        }
    };

    const handleAddToCart = async (item) => {
        const key = generateKey(item?.productId?._id, item?.size);
        try {
            setCartLoadingStates(prevStates => ({ ...prevStates, [key]: true }));
            await productService.incrementQuantity({ productId: item?.productId?._id, size: item?.size });
            refetch();
            setCartLoadingStates(prevStates => ({ ...prevStates, [key]: false }));
        } catch (error) {
            console.error("Mongo :: Error :: ", error);
            toast.error('Failed to increment.');
            setCartLoadingStates(prevStates => ({ ...prevStates, [key]: false }));
        }
    };
    const handleRemoveItem = async (productId, size) => {
        try {
            const result = await productService.removeFromCart(productId, size);
            if (result.success) {
                toast.success(result.message);
                refetch();
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to remove product');
        }
    }

    const handleOrder = async (event) => {
        event.preventDefault();
        try {
            const result = await productService.placeOrder();
            if (result.success) {
                toast.success(result.message);
            }
        } catch (error) {
            toast.error('Failed to make order');
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mx-auto max-w-7xl px-2 lg:px-0">
            <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
                        <div className="mx-auto scrollbar-hide overflow-y-scroll max-h-[600px] flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
                            <h2 className="text-3xl font-bold fixed top-12 mt-8 bg-white">Your cart</h2>
                            <ul className="flex flex-col divide-y divide-gray-200">
                                {data?.items?.length > 0 ? (data.items.map((item, index) => {
                                    const key = generateKey(item?.productId?._id, item?.size);
                                    return < li key={index} className="flex flex-col py-6 sm:flex-row sm:justify-between">
                                        <div className="flex w-full space-x-2 sm:space-x-4">
                                            <img
                                                className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                                                src={item.productId?.mainImage?.url || 'default_image_url'}
                                                alt={item.name}
                                            />
                                            <div className="flex w-full flex-col justify-between pb-4">
                                                <div className="flex w-full justify-between space-x-2 pb-2">
                                                    <div className="space-y-1">
                                                        <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                                                            {item.productId?.name}
                                                        </h3>
                                                        <p className="text-sm"> <span className='lowercase'>size</span> {item.size}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-semibold">{item.price}</p>
                                                    </div>
                                                </div>
                                                <div className="flex divide-x text-sm">
                                                    <button
                                                        onClick={() => handleRemoveItem(item?.productId?._id, item?.size)}
                                                        type="button"
                                                        className="flex items-center space-x-2 px-2 py-1 pl-0"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            className="lucide lucide-trash"
                                                        >
                                                            <path d="M3 6h18"></path>
                                                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                        </svg>
                                                        <span>Remove</span>
                                                    </button>
                                                    <div className={`min-w-24 flex mt-1 ${cartLoadingStates[key] ? 'bg-white/50 backdrop-blur-sm' : ''}`}>
                                                        {cartLoadingStates[key] &&
                                                            (<div className="flex items-center justify-center ml-10 mt-1 mb-1 fixed bg-white">
                                                                <svg className="animate-spin h-5 w-5 mr-3 text-orange-500" viewBox="0 0 24 24">
                                                                    <circle
                                                                        className="opacity-25"
                                                                        cx="12"
                                                                        cy="12"
                                                                        r="10"
                                                                        stroke="currentColor"
                                                                        strokeWidth="4"
                                                                        fill="none"
                                                                    />
                                                                    <path
                                                                        className="opacity-75"
                                                                        fill="currentColor"
                                                                        d="M4 12a8 8 0 0116 0h-4a4 4 0 00-8 0H4z"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            )}
                                                        <>
                                                            <button type="button" className="h-7 w-7" onClick={() => handleRemoveFromCart(item)}>
                                                                -
                                                            </button>
                                                            <input
                                                                type="text"
                                                                className="mx-1 h-7 w-9 rounded-md border text-center"
                                                                defaultValue={1}
                                                                readOnly
                                                                value={item.quantity}
                                                            />
                                                            <button type="button" className="flex h-7 w-7 items-center justify-center" onClick={() => handleAddToCart(item)}>
                                                                +
                                                            </button>
                                                        </>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-[90px]'>$ {item.productId?.price}</div>
                                    </li>
                                })) : (
                                    <section className='flex justify-center items-center mt-24 gap-5'>
                                        <div className='flex justify-center items-center gap-3'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path></svg>
                                            <p>Your cart is empty.</p>
                                        </div>
                                        <Link className='flex cursor-pointer' to="/">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M10.071 4.92902L11.4852 6.34323L6.82834 11.0001L16.0002 11.0002L16.0002 13.0002L6.82839 13.0001L11.4852 17.6569L10.071 19.0712L2.99994 12.0001L10.071 4.92902ZM18.0001 19V5.00003H20.0001V19H18.0001Z"></path></svg>
                                            <strong>Buy Something</strong>
                                        </Link>
                                    </section>
                                )}
                            </ul>
                        </div>
                        {(data?.items?.length > 0) &&
                            <div className='flex justify-end items-center'>
                                <button
                                    onClick={handleOrder}
                                    className='uppercase bg-orange-500 rounded-md text-white p-4'>place order</button>
                            </div>}
                    </section>
                    <section
                        aria-labelledby="summary-heading"
                        className="rounded-md mt-10 bg-white lg:col-span-4 lg:p-0"
                    >
                        <h2
                            id="summary-heading"
                            className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                        >
                            Price Details
                        </h2>
                        <div>
                            <dl className="space-y-1 px-2 py-4">
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm text-gray-800">Price ({data?.items?.length} item)</dt>
                                    <dd className="text-sm font-medium text-gray-900">$ {totalPrice}</dd>
                                </div>
                                {/* <div className="flex items-center justify-between pt-4">
                                    <dt className="flex items-center text-sm text-gray-800">
                                        <span>Discount</span>
                                    </dt>
                                    <dd className="text-sm font-medium text-green-700">- $ 3,431</dd>
                                </div> */}
                                <div className="flex items-center justify-between py-4">
                                    <dt className="flex text-sm text-gray-800">
                                        <span>Delivery Charges</span>
                                    </dt>
                                    <dd className="text-sm font-medium text-green-700">Free</dd>
                                </div>
                                <div className="flex items-center justify-between border-y border-dashed py-4 ">
                                    <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                                    <dd className="text-base font-medium text-gray-900">$ {totalPrice}</dd>
                                </div>
                            </dl>
                            {/* <div className="px-2 pb-4 font-medium text-green-700"> */}
                            {/* You will save ₹ 3,431 on this order */}
                            {/* You will save $ 3,431 on this order */}
                            {/* </div> */}
                        </div>
                    </section>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
        </div >
    )
}

