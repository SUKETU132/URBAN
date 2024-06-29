import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AddReviewModal = ({ onConfirm, onRequestClose }) => {
    const [rating, setRating] = useState(1);
    const [review, setReview] = useState('');

    const handleConfirm = () => {
        onConfirm({ rating, review });
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg max-w-lg w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Write a Review</h2>
                    <button className="text-gray-600 hover:text-gray-800" onClick={onRequestClose}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="mb-4">
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                        Rating
                    </label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
                        Review
                    </label>
                    <textarea
                        id="review"
                        name="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        rows="3"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        maxLength="1000"
                        required
                    ></textarea>
                </div>
                <div className="flex justify-end">
                    <button
                        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500"
                        onClick={handleConfirm}
                        disabled={!review || rating < 1 || rating > 5}
                    >
                        Submit Review
                    </button>
                    <button
                        className="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                        onClick={onRequestClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddReviewModal;
