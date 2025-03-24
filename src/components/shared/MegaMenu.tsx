import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface MenuItem {
  title: string;
  items: {
    name: string;
    description?: string;
    link: string;
  }[];
}

const menuData: MenuItem[] = [
  {
    title: "Popular Brands",
    items: [
      {
        name: "Top",
        description: "High-performance racing motorcycles",
        link: "/products?brand=Top",
      },
      {
        name: "Ranger",
        description: "Premium sport bikes",
        link: "/products?brand=Ranger",
      },
      {
        name: "Phoniex",
        description: "Urban sport motorcycles",
        link: "/products?brand=Phoniex",
      },
    ],
  },
  {
    title: "Popular Categories",
    items: [
      {
        name: "City Bikes",
        description: "Traditional cruiser motorcycles",
        link: "/products?category=city",
      },
      {
        name: "Mountain Bikes",
        description: "Customized cruiser bikes",
        link: "/products?category=mountain",
      },
      {
        name: "Road Bikes",
        description: "Long-distance cruiser bikes",
        link: "/products?category=road",
      },
    ],
  },
  // Add more categories as needed
];

const MegaMenuKid: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div className="absolute">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex flex-col bg-white rounded-md px-4 w-[300px]">
            {menuData.map((category) => (
              <div
                key={category.title}
                className="relative"
                onMouseEnter={() => setActiveMenu(category.title)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="py-4 px-2 text- text-orange-600 font-semibold hover:underline transition duration-300">
                  {category.title}
                </button>
                <AnimatePresence>
                  {activeMenu === category.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-40 top-0 border w-[300px] bg-white shadow-xl rounded-lg mt-2 p-6 grid grid-cols-1 gap-4 z-50"
                    >
                      {category.items.map((item) => (
                        <Link
                          key={item.name}
                          to={item.link}
                          className="block hover:bg-gray-50 rounded-lg p-3 transition duration-300"
                        >
                          <div className="font-medium text-orange-600">
                            {item.name}
                          </div>
                          {item.description && (
                            <div className="text-sm text-gray-500">
                              {item.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuKid;
