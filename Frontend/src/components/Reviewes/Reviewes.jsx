import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import Review from '../Review/Review';
import AddReviewModal from '../PopUpForReview/ReviewPopup'; // Assuming you create AddReviewModal component
import productService from '../../MongoDB/config';

const Reviews = ({ productId, reviews = [], avgRating }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviewList, setReviewList] = useState(reviews.length > 0 ? reviews : [{ messages: [] }]);

    // Open modal handler
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Close modal handler
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Update reviewList when reviews prop changes
    useEffect(() => {
        setReviewList(reviews);
    }, [reviews]);

    // Function to handle adding a new review
    const handleAddReview = async (reviewData) => {
        try {
            const { review, rating } = reviewData;
            const result = await productService.postReview(productId, review, rating);

            if (result.success) {
                const newReview = {
                    profilePic: result.profilePic,
                    username: result.name,
                    message: result.review.message,
                    rating: result.review.rating,
                    createdAt: result.date
                };

                // Update reviewList with new review
                setReviewList(prevReviews => [{
                    ...prevReviews[0],
                    messages: [newReview, ...prevReviews[0].messages]
                }]);

                // Show success toast
                toast.success(result.message);
            } else {
                // Show error toast if adding review failed
                toast.error(result.message);
            }
        } catch (error) {
            // Show error toast for any unexpected errors
            toast.error(error.message || 'An error occurred while posting the review.');
        } finally {
            // Close the modal regardless of success or failure
            closeModal();
        }
    };

    // Function to format date string
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <div className='mb-[100px] w-full'>
            {/* Header */}
            <div className='mb-2 max-w-[1400px] bg-[#0404045c] mr-auto ml-auto h-[50px] rounded-sm flex flex-col justify-center items-center pt-8 pb-8'>
                <div className='flex items-center justify-between w-full'>
                    <h1 className='flex text-center ml-5'>Customer Reviews {" "}  ({avgRating.toFixed(1)})</h1>
                    <div className='mr-7'>
                        <button className='bg-orange-500 p-2 rounded-md text-white' onClick={openModal}>
                            Add Review
                        </button>
                    </div>
                </div>
            </div>

            {/* Review list */}
            <div className='rounded-sm max-h-[600px] overflow-y-scroll' style={{ border: '1px solid #ccc', padding: '10px' }}>
                {reviewList && reviewList.length > 0 && reviewList[0].messages && reviewList[0].messages.length > 0 ? (
                    reviewList[0].messages.map((review, index) => (
                        <Review
                            key={index}
                            image={review.profilePic}
                            username={review.username}
                            message={review.message}
                            rating={review.rating}
                            date={formatDate(review.createdAt)}
                        />
                    ))
                ) : (
                    <div className='text-center'>No Review Found</div>
                )}
            </div>

            {/* Add Review Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Add Review Modal"
                className="modal"
                overlayClassName="overlay"
            >
                <AddReviewModal
                    onConfirm={handleAddReview}
                    onRequestClose={closeModal}
                />
            </Modal>

            {/* Toast notifications */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
        </div>
    );
};

export default Reviews;
