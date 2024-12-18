import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { getClientSays } from "../api/Foods";

const OurClient = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      return await getClientSays();
    },
  });

  return (
    <div className="max-w-[1220px] 2xl:max-w-[91%] mx-auto mt-10">
      <div className="text-[#f01543] text-3xl md:text-5xl text-center font-medium">
        What Our Clients Say
      </div>
      <div className="text-stone-600 my-4 md:font-medium text-center md:w-2/3 mx-5 md:mx-auto">
        We place huge value on our relationships and have seen the benefit they
        bring to our community. Feedback from our members is vital in helping us
        grow and improve.
      </div>
      <Swiper
        speed={200}
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
        spaceBetween={10}
        breakpoints={{
          480: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1000: { slidesPerView: 3, spaceBetween: 20 },
          1536: { slidesPerView: 4, spaceBetween: 20 },
        }}
      >
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:mx-2 lg:mx-auto mt-4">
            {[...Array(3)].map((_, index) => (
              <div key={index}>
                <div className="overflow-hidden w-full m-4 flex justify-center rounded-lg">
                  <div className="flex flex-col items-center justify-center text-center animate-pulse">
                    <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                    <div className="text-stone-500 m-2 w-40 h-4 bg-gray-300 rounded"></div>
                    <div className="font-bold text-[#f01543] w-24 h-6 bg-gray-300 rounded"></div>
                    <div className="text-sm font-medium text-stone-500 w-20 h-4 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          data?.map((client) => (
            <SwiperSlide key={client?._id}>
              <div className="overflow-hidden w-full m-4 flex justify-center rounded-lg">
                <div className="flex flex-col items-center justify-center text-center">
                  <img
                    src={client?.image}
                    alt="no photo"
                    className="w-20 rounded-full"
                  />
                  <div className="text-stone-500 m-2">{client?.quote}</div>
                  <div className="font-bold text-[#f01543]">{client?.name}</div>
                  <div className="text-sm font-medium text-stone-500 hover:text-[#f01543]">
                    <a href="#">{client?.role}</a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default OurClient;
