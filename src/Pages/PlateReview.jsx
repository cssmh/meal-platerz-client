import { useQuery } from "@tanstack/react-query";
import { getAllFoodPhotos } from "../api/Foods";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const PlateReview = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["allFoodPhotos"],
    queryFn: async () => {
      return await getAllFoodPhotos();
    },
  });

  const photos = data?.result?.map((food) => food.food_image) || [];

  const renderSkeleton = () => (
    <div className="flex space-x-4">
      {Array(12)
        .fill("")
        .map((_, idx) => (
          <div key={idx} className="w-28 h-24 bg-gray-200 animate-pulse"></div>
        ))}
    </div>
  );

  return (
    <div className="mt-10">
      {isLoading ? (
        <div className="flex justify-center items-center">
          {renderSkeleton()}
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
            480: { slidesPerView: 5, spaceBetween: 0 },
            768: { slidesPerView: 8, spaceBetween: 0 },
            1000: { slidesPerView: 12, spaceBetween: 0 },
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
