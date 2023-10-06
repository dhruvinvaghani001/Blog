import React from 'react'

const Button = ({ type, className = "", children, ...props }) => {
    return (
        <button {...props} type={type} className={`px-6 py-2 rounded-md ${className}`}>{children}</button>

    )
}

export default Button