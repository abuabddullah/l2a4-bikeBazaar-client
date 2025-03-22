import React from "react";
import { motion } from "framer-motion";

const HeadLine = ({ heading }: { heading: string }) => {
  return (
    <motion.h2
      initial={{ x: -50 }}
      animate={{ x: 0 }}
      className="text-xl lg:text-4xl font-bold mb-8 text-gray-800 relative"
    >
      <span className="relative">
        {heading}
        <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-orange-500"></span>
      </span>
    </motion.h2>
  );
};

export default HeadLine;
