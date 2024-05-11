import React, { ChangeEvent } from 'react';

interface InputProps {
    title: string;
    placeholder: string;
    value: string;
    disabled: boolean;
    onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ title, placeholder, value, disabled, onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }

    return (
        <div className="rounded-sm mx-auto w-[50%] my-5">
            <p className='ml-1'>{title}</p>
            <input type="text" disabled={disabled} placeholder={placeholder} value={value} className="border-2 w-full mx-auto p-2 rounded-sm border-black" onChange={handleChange}/>
        </div>
    );
};

export default Input;
