import React, { ChangeEvent } from 'react';

interface InputProps {
    placeholder: string;
    onChange: (value: any) => void;
}

const FileInput: React.FC<InputProps> = ({ placeholder, onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (loadEvent: ProgressEvent<FileReader>) => {
                const result = loadEvent.target?.result;
                if (result) {
                    onChange(result.toString());
                }
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="rounded-sm mx-auto w-[50%] my-5">
            <input type="file" placeholder={placeholder} className="border-2 w-full mx-auto p-2 rounded-sm border-black" onChange={handleChange}/>
        </div>
    );
};

export default FileInput;
