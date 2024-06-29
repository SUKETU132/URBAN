import React from 'react'

const Button = ({
    children,
    type = 'button',
    bgColor = '',
    textColor = 'text-white',
    className = '',
    ...props
}) => {
    return (
        <button className={`px-4 py-2 ${textColor} ${bgColor} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button
