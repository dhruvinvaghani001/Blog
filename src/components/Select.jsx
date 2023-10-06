import React, { useId } from 'react'

const Select = ({ options, label, className }, ref) => {
    const id = useId();

    return (
        <div className='flex flex-col'>
            {label && <label className='block mb-2 text-lg xl:text-md font-medium text-gray-900' htmlFor={id} >{label}</label>}
            <select ref={ref} name="" className={`px-3 py-3 border-2 rounded-lg text-md  w-full focus:border-2 focus:outline-none focus:border-primary  bg-gray-50  border-gray-300 text-gray-900   ${className}`} id={id}>
                {options && options.map((option, index) => (
                    <option className={`px-3 py-3 border-[1px] rounded-lg text-lg xl:text-md  w-full focus:border-[1px] focus:outline-none focus:border-primary  bg-gray-50  border-gray-300 text-gray-900   ${className}`} key={index} value={option}>{option}</option>
                ))}
            </select>

        </div>
    )
}

export default React.forwardRef(Select)