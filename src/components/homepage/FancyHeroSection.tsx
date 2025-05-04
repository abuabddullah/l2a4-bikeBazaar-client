import React from "react";

const FancyHeroSection: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[1.7fr_1fr] md:grid-rows-[1fr_1fr] gap-4">
            {/* div1 - Main content */}
            <div className="bg-blue-500 col-span-1 md:col-span-1 md:row-span-2">
                <h2 className="text-white text-3xl p-4">Main Content</h2>

            </div>

            {/* div2 - Sidebar */}
            <div className="bg-green-500 col-span-1 md:col-span-1 md:row-span-1">
                <h2 className="text-white text-3xl p-4">Sidebar</h2>

            </div>

            {/* div3 - Footer */}
            <div className="bg-red-500 col-span-1 md:col-span-1 md:row-span-1">
                <h2 className="text-white text-3xl p-4">Footer</h2>

            </div>
        </div>
    );
};

export default FancyHeroSection;
