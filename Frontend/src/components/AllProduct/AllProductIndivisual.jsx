import React, { useState, useCallback } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import productService from '../../MongoDB/config';
import LoadingSpinner from '../Loading/LoadingSpinner';
import "./op.css";

const TableOne = React.memo(({ products, fetchProducts, totalStars = 5 }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const openModal = useCallback((product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const handleDelete = async () => {

        setIsLoading(true);
        try {
            const product = await productService.deleteProduct(selectedProduct._id);
            if (product) {
                toast.success(product.message);
                fetchProducts();
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to delete product');
        } finally {
            setIsLoading(false);
            closeModal();
        }
    };

    return (
        <>
            <section className="mx-auto w-full max-w-7xl px-4 py-4">
                {isLoading ? <LoadingSpinner /> : null}
                <div className="mt-6 flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                <div className="overflow-y-auto max-h-[590px] custom-scrollbar">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50 sticky top-0">
                                            <tr>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Product
                                                </th>
                                                <th scope="col" className="px-12 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Rating
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {products.map((product) => (
                                                <tr key={product._id}>
                                                    <td className="whitespace-nowrap px-4 py-4">
                                                        <div className="flex items-center">
                                                            <div className="h-15 w-10 flex-shrink-0">
                                                                <img
                                                                    className="h-10 w-10 rounded-full object-cover"
                                                                    src={product.mainImage.url}
                                                                    alt=""
                                                                    loading="lazy"
                                                                />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm object-contain font-medium text-gray-900">{product.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-12 py-4">
                                                        <div className="star-rating flex">
                                                            {[...Array(totalStars)].map((star, index) => {
                                                                const ratingValue = index + 1;
                                                                return (
                                                                    <span
                                                                        key={ratingValue}
                                                                        className={`star ${ratingValue <= (product?.avgRating) ? 'filled' : 'empty'}`}
                                                                    >
                                                                        ★
                                                                    </span>
                                                                );
                                                            })}
                                                            <div className="ml-3 mt-1">({product?.reviewCount})</div>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                                        <button
                                                            type="button"
                                                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                                            onClick={() => openModal(product)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <DeleteConfirmationModal
                                    isOpen={isModalOpen}
                                    onRequestClose={closeModal}
                                    onConfirm={handleDelete}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
            </section>
        </>
    )
});

export default TableOne;
