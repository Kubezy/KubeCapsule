import React, { ChangeEvent } from 'react';

interface ReviewProps {
    title: string;
    value: string;
}

const Review: React.FC<ReviewProps> = ({ title, value }) => {
    return (
        <div className="rounded-sm mx-auto w-[50%] my-5 select-none">
            <p className='ml-1'>{title}</p>
            <p className="border-2 w-full mx-auto p-2 rounded-sm border-black text-slate-600 whitespace-pre-wrap">
                {value}
            </p>
        </div>
    );
};

export default Review;
