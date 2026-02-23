import React from 'react';

const ProductSkeleton = () => (
    <div className="group relative bg-[#120a06]/80 border border-white/5 rounded-2xl overflow-hidden animate-pulse">
        {/* Image */}
        <div className="h-80 bg-[#1A0F0A]" />
        {/* Content */}
        <div className="p-6 space-y-3">
            <div className="flex justify-between">
                <div className="h-5 bg-[#2a1a10] rounded w-2/3" />
                <div className="h-5 bg-[#2a1a10] rounded w-1/5" />
            </div>
            <div className="h-4 bg-[#2a1a10] rounded w-full" />
            <div className="h-4 bg-[#2a1a10] rounded w-4/5" />
            <div className="flex gap-2 mt-3">
                <div className="h-6 w-16 bg-[#2a1a10] rounded-full" />
                <div className="h-6 w-16 bg-[#2a1a10] rounded-full" />
            </div>
        </div>
    </div>
);

export default ProductSkeleton;
