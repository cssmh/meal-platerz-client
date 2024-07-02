import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const OurClient = () => {
  const clients = [
    {
      name: "Mr. Mobarok",
      quote:
        "Joining this community has helped me reduce food waste significantly. I love being able to share excess food with others who need it.",
      role: "Community Member",
      image:
        "https://raw.githubusercontent.com/cssmh/book-sharing-client/main/src/assets/Reviewer1.png",
    },
    {
      name: "Dia Mirza",
      quote:
        "This platform is amazing! It not only helps the environment but also brings people together. I have made great connections through food sharing.",
      role: "Secretary",
      image:
        "https://i.ibb.co/rdwSkfC/dia.jpg",
    },
    {
      name: "Tourist Offl",
      quote:
        "I love being part of this food community! It’s rewarding to know that my excess food goes to people who appreciate it.",
      role: "Sales Manager",
      image:
        "https://raw.githubusercontent.com/cssmh/book-sharing-client/main/src/assets/Reviewer4.jpeg",
    },
    {
      name: "Prachi Desai",
      quote:
        "I'm committed to rooting out online scammers who hinder users from freely sharing food among themselves.",
      role: "Community Member",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt5ovrUWNzHkSdlwTPSaZhXOXqkgm-r9touloPLkoaL-STQtDCyOY-dUHjgA_vStY5dp0&usqp=CAU",
    },
    {
      name: "Momen",
      quote:
        "I'm dedicated to fostering connections through our platform. As CEO of MealPlaterz, I'm thrilled to lead this journey.",
      role: "CEO of MealPlaterz",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJvLWQtTsYuY_yCBq3BcrtMIDmP2BvESC650GCJ8dH2fRi1VLz6=s288-c-no",
    },
  ];

  return (
    <div className="max-w-[1220px] mx-auto">
      <div className="text-redFood text-3xl md:text-5xl text-center font-medium">
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
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          480: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1000: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        {clients.map((client, idx) => (
          <SwiperSlide key={idx}>
            <div className="overflow-hidden w-full m-4 flex justify-center rounded-lg">
              <div className="flex flex-col items-center justify-center text-center">
                <img
                  src={client.image}
                  alt="no photo"
                  className="w-20 rounded-full"
                />
                <div className="text-stone-500 m-2">{client.quote}</div>
                <div className="font-bold text-redFood">{client.name}</div>
                <div className="text-sm font-medium text-stone-500 hover:text-redFood">
                  <a href="#">{client.role}</a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OurClient;
