import React, { ChangeEvent } from 'react';

interface TextAreaProps {
    placeholder: string;
    onChange: (value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ placeholder, onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    }

    return (
        <div className="rounded-sm mx-auto w-[50%] my-5">
            <textarea placeholder={placeholder} className="border-2 w-full mx-auto p-2 rounded-sm border-black" onChange={handleChange}/>
        </div>
    );
};

export default TextArea;
