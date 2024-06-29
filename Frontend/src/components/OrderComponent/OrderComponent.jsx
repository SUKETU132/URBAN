import React, { useEffect, useState } from 'react';
import { useGetOrderItemQuery } from '../../store/cartSlice';
import LoadingDots from '../LoadingDots';


const OrderTwo = () => {
    const [orderData, setOrderData] = useState([]);
    const { data, isLoading } = useGetOrderItemQuery();

    useEffect(() => {
        if (data && data.status === 'success') {
            setOrderData(data.orderData);
        }
    }, [data]);

    console.log("This is order data: ", data);

    const formatCreatedAtDate = (createdAt) => {
        const date = new Date(createdAt);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
            <h2 className="text-3xl font-bold">Order Details</h2>
            <div className="mt-3 text-sm">
                Check the status of recent and old orders & discover more products
            </div>
            <div className='overflow-y-scroll h-[500px] mt-8'>
                {isLoading ? (
                    <div className='flex justify-center items-center'><LoadingDots /></div>
                ) : (
                    orderData.map((orderDetail) => (
                        <div key={orderDetail._id} className="mt-3 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
                            <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
                                <div className="p-8">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                                        {[
                                            ['Order ID', orderDetail._id],
                                            ['Date', orderDetail.createdAt ? formatCreatedAtDate(orderDetail.createdAt) : ''],
                                            ['Total Amount', `₹ ${orderDetail.orderPrice}`],
                                            ['Order Status', orderDetail.status],
                                        ].map(([key, value]) => (
                                            <div key={key} className="mb-4">
                                                <div className="text-sm font-semibold">{key}</div>
                                                <div className="text-sm font-medium text-gray-700">{value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="p-8">
                                    <ul className="-my-7 divide-y divide-gray-200">
                                        {orderDetail.items.map((product) => (
                                            <li key={product._id} className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
                                                <div className="flex flex-1 items-stretch">
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                                                            src={product.productId.mainImage.url}
                                                            alt={product.productId.name}
                                                        />
                                                    </div>
                                                    <div className="ml-5 flex flex-col justify-between">
                                                        <div className="flex-1">
                                                            <p className="text-sm font-bold text-gray-900">{product.productId.name}</p>
                                                            <p className="mt-1.5 text-sm font-medium text-gray-500">{product.productId.category}</p>
                                                        </div>
                                                        <p className=" text-sm font-medium text-gray-500"><span className='lowercase'>(size</span> {product.size})</p>
                                                        <p className="mt-4 text-sm font-medium text-gray-500">x {product.quantity}</p>
                                                    </div>
                                                </div>
                                                <div className="ml-auto flex flex-col items-end justify-between">
                                                    <p className="text-right text-sm font-bold text-gray-900">₹ {product.productId.price}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <hr className="my-8 border-t border-t-gray-200" />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrderTwo;
