import { motion } from "framer-motion";
import HeadLine from "../shared/HeadLine";

const OurPartners = () => {
  return (
    <section
      className="py-16 bg-gradient-to-b from-gray-50 to-white"
      id="partners"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <HeadLine heading="Our Trusted Partners" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            We collaborate with leading brands and manufacturers to bring you
            the finest selection of bicycles and accessories.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="relative h-[300px] w-full flex justify-center">
            <img
              src="https://res.cloudinary.com/dglsw3gml/image/upload/v1742615040/bicycle-shop/our_partners_bem30k.png"
              alt="Our Partners"
              className="object-contain"
            />
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 blur-xl" />
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-50 rounded-full opacity-50 blur-xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 italic">
            Together, we deliver excellence in cycling
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OurPartners;
