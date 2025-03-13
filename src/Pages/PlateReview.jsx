import { useQuery } from "@tanstack/react-query";
import { getAllFoodPhotos } from "../api/Foods";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const PlateReview = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["allFoodPhotos"],
    queryFn: getAllFoodPhotos,
  });

  const photos = data?.result?.map((food) => food.food_image) || [];

  return (
    <div className="relative top-[59px]">
      {isLoading ? (
        <div className="flex justify-center items-center mb-9">
          <span className="loading loading-bars loading-md"></span>
        </div>
      ) : (
        <Swiper
          speed={400}
          grabCursor={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            waitForTransition: false,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          slidesPerView={1}
          spaceBetween={0}
          breakpoints={{
            250: { slidesPerView: 3, spaceBetween: 0 },
            375: { slidesPerView: 4, spaceBetween: 0 },
            480: { slidesPerView: 5, spaceBetween: 0 },
            768: { slidesPerView: 8, spaceBetween: 0 },
            1000: { slidesPerView: 12, spaceBetween: 0 },
            1536: { slidesPerView: 16, spaceBetween: 0 },
          }}
        >
          {photos?.map((photo, idx) => (
            <SwiperSlide key={idx}>
              <img src={photo} alt="Food" className="w-28 h-24 object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default PlateReview;
