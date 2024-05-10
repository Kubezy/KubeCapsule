import React, { ChangeEvent } from 'react';

interface DropdownProps {
    title: string;
    options: string[];
    onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ title, options, onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value)
    }

    return (
        <div className='mx-auto w-[50%]'>
            <div className="relative w-[40%] max-w-full">
                <p className='ml-1'>{title}</p>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-[40%] bottom-0 w-5 h-5 my-auto text-gray-400 right-3"
                viewBox="0 0 20 20"
                fill="currentColor"
                >
                <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
                </svg>
                <select onChange={handleChange} 
                className="w-full px-3 py-2 text-sm text-gray-600 bg-white border-black border-2 rounded-sm shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-kubernetes focus:ring-2">
                {options.map((option) => <option>{option}</option>)}
                </select>
            </div>
        </div>
    );
};

export default Dropdown;