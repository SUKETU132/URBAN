import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./ProductOverview.css"
import Button from '../../Button';
import { useGetCartItemQuery, useGetDataQuery } from '../../store/cartSlice';
import CryptoJS from 'crypto-js';
import Reviewes from '../Reviewes/Reviewes';
import productService from '../../MongoDB/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductOverviewOne({ totalStars = 5, onRate }) {
    const { slug } = useParams();
    const { data, isLoading, error } = useGetDataQuery();
    const { refetch } = useGetCartItemQuery()
    const [rating, setRating] = useState(0);
    const [productSize, setProductsize] = useState('S');
    const [product, setProduct] = useState(null);
    const [reviewCount, setReviewCount] = useState(0);
    const [letsOpen, setLetsOpen] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const decryptId = (encryptedId) => {
        if (!encryptedId) return '';
        const key = 'your_secret_key';
        const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedId), key);
        const decryptedId = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedId;
    };

    useEffect(() => {
        if (data) {
            const decryptedId = decryptId(slug);
            const productTobeOverviewed = data.products?.find(item => item._id === decryptedId);
            setProduct(productTobeOverviewed);
            setRating(productTobeOverviewed.avgRating || 0);
            setReviewCount(productTobeOverviewed.reviewCount || 0);
        }
    }, [data, slug]);

    useEffect(() => {
        const handleReview = async () => {
            if (product) {
                const result = await productService.fetchProductReviews(product._id);
                console.log("This is the result: ", result);
                setReviews(result);
            }
        }
        handleReview();
    }, [product]);

    const handleAddToCart = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const result = await productService.addToCart({ productId: decryptId(slug), size: productSize });
            if (result) {
                toast.success("Add to cart successfully.");
                refetch();
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
            toast.error('Failed to add product in cart');
        }
    }


    if (isLoading) return <div className='flex justify-center items-center mt-8 mb-8'>Loading...</div>;
    if (error || !product) return <div className='flex justify-center items-center mt-8 mb-8'>Product not found</div>;

    return (

        <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16">
            <div className="pt-8">
                <div className="flex items-center">
                    <ol className="flex w-full items-center overflow-hidden">
                        <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="text-body mt-0.5 text-base">/</li>
                        <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                            <Link className="capitalize" to={`/${product?.category === 'kid' ? 'kids' : product?.category?.toLowerCase()}`}>
                                {product.category}
                            </Link>
                        </li>
                        <li className="text-body mt-0.5 text-base">/</li>
                        <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                            <Link className="capitalize" href="#">
                                products
                            </Link>
                        </li>
                        <li className="text-body mt-0.5 text-base">/</li>
                        <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                            <Link className="capitalize" href="#">
                                {product.name}
                            </Link>
                        </li>
                    </ol>
                </div>
            </div>
            <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
                <div className="col-span-5 grid grid-cols-2 gap-2.5">
                    {product?.subImages?.map((item, i) => (
                        <div key={i} className="col-span-1 transition duration-150 ease-in hover:opacity-90">
                            <img
                                src={item.url}
                                alt={product.name}
                                className="w-full object-cover"
                            />
                        </div>
                    ))}
                </div>
                <div className="col-span-4 pt-8 lg:pt-0">
                    <div className="mb-7 border-b border-gray-300 pb-7">
                        <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
                            {product.name}
                        </h2>
                        <p className="text-body text-sm leading-6  lg:text-base lg:leading-8">
                            {product.description}
                        </p>
                        <div className="mt-5 flex items-center ">
                            <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                                ${product.price}
                            </div>
                            <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                                ${product.price}
                            </span>
                        </div>
                    </div>
                    <div className="star-rating">
                        {[...Array(totalStars)].map((star, index) => {
                            const ratingValue = index + 1;
                            return (
                                <span
                                    key={ratingValue}
                                    className={`star ${ratingValue <= (rating) ? 'filled' : 'empty'}`}
                                >
                                    ★
                                </span>
                            );
                        })}
                        <div className='ml-3 mt-1'>
                            ({reviewCount})
                        </div>
                    </div>
                    <div className="border-b border-gray-300 pb-3  ">
                        <div className="mb-4">
                            <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                                size
                            </h3>
                            <ul className="colors -mr-3 flex flex-wrap">
                                {['S', 'M', 'L', 'XL'].map((size) => (
                                    <li
                                        key={size}
                                        onClick={
                                            () => {
                                                setProductsize(size);
                                            }
                                        }
                                        className={`${size === productSize ? "selected" : ""} text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm`}
                                    >
                                        {size}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">

                        <Button
                            type="button"
                            className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            children={loading ? "Adding..." : "Add to cart"}
                            onClick={(event) => handleAddToCart(event)}
                        />
                    </div>
                    <div className="py-6 ">
                        <ul className="space-y-5 pb-1 text-sm">
                            <li>
                                <span className="text-heading inline-block pr-2 font-semibold">SKU:</span>
                                N/A
                            </li>
                            <li>
                                <span className="text-heading inline-block pr-2 font-semibold">Category:</span>
                                <Link className="hover:text-heading transition hover:underline" to={`/${product?.category === 'kid' ? 'kids' : product?.category?.toLowerCase()}`}>
                                    {product?.category}
                                </Link>
                            </li>
                            <li className="productTags">
                                <span className="text-heading inline-block pr-2 font-semibold">Tags:</span>
                                <Link
                                    className="hover:text-heading inline-block pr-1.5 transition last:pr-0 hover:underline"
                                    href="#"
                                >
                                    {product.name}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="shadow-sm ">
                        <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                            <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                                Product Details
                            </h2>
                            <div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center">
                                <div className="bg-heading h-0.5 w-full rounded-sm" />
                                <div className="bg-heading absolute bottom-0 h-full w-0.5 origin-bottom scale-0 transform rounded-sm transition-transform duration-500 ease-in-out" />
                            </div>
                        </header>
                        <div>
                            <div className="pb-6 text-sm leading-7 text-gray-600 md:pb-7">
                                Our Customer Experience Team is available 7 days a week and we offer 2 ways to get
                                in contact.Email and Chat . We try to reply quickly, so you need not to wait too
                                long for a response!.
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                            <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                                Additional Information
                            </h2>
                        </header>
                    </div>
                    <div className=""
                        onClick={() => {
                            setLetsOpen(prev => !prev);
                        }}
                    >
                        <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                            <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                                Customer Reviews
                            </h2>
                        </header>
                    </div>
                </div>
            </div>
            {letsOpen && <div className='w-full'>
                <Reviewes productId={product._id} reviews={reviews} avgRating={rating} />
            </div>}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
        </div>
    )
}
