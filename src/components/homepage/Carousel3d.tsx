import { useGetProductsQuery } from "../../store/api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import { EffectCube } from "swiper/modules";

const Carousel3d = () => {
  const { data: products, isLoading } = useGetProductsQuery(undefined);

  const sortedProducts = products
    ? [...products].sort((a, b) => a.stock - b.stock).slice(0, 3)
    : [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-4/5 mx-auto relative h-[50vh]">
      {" "}
      {/* Added h-[50vh] */}
      <Swiper
        effect="cube"
        grabCursor={true}
        cubeEffect={{
          shadow: false,
          slideShadows: false,
        }}
        loop={true}
        spaceBetween={50}
        slidesPerView={1}
        centeredSlides={true}
        modules={[EffectCube]}
        className="h-full"
      >
        {sortedProducts?.map((product) => (
          <SwiperSlide key={product._id} className="h-full">
            {" "}
            {/* Added h-full */}
            <div className="bg-white rounded-lg p-4 shadow-lg transform transition duration-300 hover:scale-105 hover:rotate-y-10 hover:shadow-xl text-center h-full">
              {" "}
              {/* Added h-full and reduced padding */}
              <img
                src={product.imageURL}
                alt={product.name}
                className="h-[50%] w-full object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-xs text-gray-500 mb-1 line-clamp-2">
                {product.description}
              </p>
              <p className="text-base text-gray-800 mb-1">${product.price}</p>
              <p className="text-xs font-bold text-red-500">
                {product.stock} in stock
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel3d;
