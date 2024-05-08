import React, { ChangeEvent } from 'react';

interface InputProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ placeholder, value, onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }

    return (
        <div className="rounded-sm mx-auto w-[50%] my-5">
            <input type="text" placeholder={placeholder} value={value} className="border-2 w-full mx-auto p-2 rounded-sm border-black" onChange={handleChange}/>
        </div>
    );
};

export default Input;
