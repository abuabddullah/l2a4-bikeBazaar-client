import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const banners: {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1595060938781-ebe78f6f9f65",
    title: "Premium Bikes",
    subtitle: "Up to 40% off on selected models",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1596274646574-266971f0dfad",
    title: "New Arrivals",
    subtitle: "Discover our latest collection",
  },
  {
    id: 2,
    image: "https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b",
    title: "Casula Bikes",
    subtitle: "Discover our latest collection",
  },
];

const BannerCarousel = () => {
  return (
    <div className="relative w-full ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        effect="fade"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[40vh]">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-5xl font-bold mb-4">{banner.title}</h1>
                  <p className="text-xl">{banner.subtitle}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        className="swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2  p-3 rounded-full z-10"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="h-8 w-8 text-gray-800" />
      </button>

      <button
        className="swiper-button-next absolute right-4 top-1/2 -translate-y-1/2  p-3 rounded-full z-10"
        aria-label="Next slide"
      >
        <FaChevronRight className="h-8 w-8 text-gray-800" />
      </button>
    </div>
  );
};

export default BannerCarousel;
