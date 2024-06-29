import React, { useState } from "react";
import "./Item.css";
import CryptoJS from 'crypto-js';
import { Link } from "react-router-dom";
import productService from "../../MongoDB/config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetCartItemQuery } from "../../store/cartSlice";

const Item = (props) => {
    const { refetch } = useGetCartItemQuery();
    const [loading, setLoading] = useState(false);
    const [selectedSize, setSize] = useState('S');
    const productSizes = ['S', 'M', 'L', 'XL'];

    const handleAddItem = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const result = await productService.addToCart({ productId: props.id, size: selectedSize });
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
    };

    const encryptId = (id) => {
        if (!id) return '';
        const key = 'your_secret_key';
        const encrypted = CryptoJS.AES.encrypt(id.toString(), key).toString();
        return encodeURIComponent(encrypted);
    };

    return (
        <div className="cursor-pointer">
            <div className="card">
                <Link to={`/product/${encryptId(props.id)}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <figure>
                        <img src={props.image} alt="t-shirt" />
                    </figure>
                </Link>
                <section className="details">
                    <div className="min-details">
                        <h1>{props.name} <span>{props.category}</span></h1>
                        <h1 className="price">${props.price}</h1>
                    </div>
                    <div className="options">
                        <div className="options-size">
                        </div>
                    </div>
                    <button className="btn" onClick={handleAddItem}>{loading ? "adding..." : "add to cart"}</button>
                </section>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
        </div>
    );
}

export default Item;
