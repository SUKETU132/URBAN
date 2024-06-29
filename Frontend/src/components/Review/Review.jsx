import React from 'react'

const Review = ({ image, username, message, rating, date }) => {

    return (
        <div className='mt-3 bg-[#1212120f] rounded-md p-3 pt-2'>
            <div className="mt-4 flex space-x-3">
                <img className="h-full w-10 rounded-lg" src={image} alt={username} />
                <div>
                    <p className="text-sm ml-1 font-semibold leading-tight text-gray-900">
                        {username}
                    </p>
                    <p className="text-sm mt-1 ml-1 leading-tight text-gray-600">{date}</p>
                </div>
                <p className='float-right'>{rating} ⭐</p>
            </div>
            <p className='mt-4 text-base leading-relaxed text-gray-700'>{message}</p>
        </div>
    )
}

export default Review
