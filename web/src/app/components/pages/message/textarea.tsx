import React, { ChangeEvent } from 'react';

interface TextAreaProps {
    title: string;
    placeholder: string;
    onChange: (value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ title, placeholder, onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    }

    return (
        <div className="rounded-sm mx-auto w-[50%] my-5">
            <p className='ml-1'>{title}</p>
            <textarea placeholder={placeholder} className="border-2 w-full mx-auto p-2 rounded-sm border-black" onChange={handleChange}/>
        </div>
    );
};

export default TextArea;
