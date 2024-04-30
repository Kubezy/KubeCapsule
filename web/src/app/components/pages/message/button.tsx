import React from 'react';

interface ButtonProps {
    title: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onClick }) => {
    return (
        <div className="rounded-sm mx-auto w-[30%] my-20">
            <button className="border-2 w-full mx-auto p-2 rounded-sm border-black bg-kubernetes text-white" onClick={onClick}>
                {title}    
            </button>
        </div>
    );
};

export default Button;