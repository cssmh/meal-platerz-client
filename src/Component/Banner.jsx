import { Link } from "react-router-dom";
import BannerImg from "../assets/food-banner.jpg";

const Banner = () => {
  return (
    <div
      // data-aos="fade-up"
      // data-aos-duration="900"
      // data-aos-anchor-placement="top-bottom"
      className="hero min-h-[55vh] md:min-h-[75vh] lg:min-h-[90vh] 2xl:min-h-[93vh] bg-cover relative -top-20 lg:-top-[59px]"
      style={{
        backgroundImage: `url(${BannerImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay bg-opacity-0"></div>
      <div className="max-w-2xl mr-auto ml-4 md:ml-12 2xl:ml-16 text-black">
        <div className="space-y-3">
          <h1 className="text-2xl nav lg:text-4xl 2xl:text-6xl font-medium mt-12 md:mt-5">
            Building Communities <br /> by Sharing Excess Food <br /> Resources
          </h1>
          <p className="hidden md:block text-sm text-gray-700 md:text-base w-[80%] pb-3">
            Our mission is simple yet profound: to build resilient communities
            by fostering the sharing of excess food resources. We believe that
            in a world where millions go hungry while tons of food are wasted,
            there is an urgent need for collective action.
          </p>
          <p className="md:hidden text-sm text-gray-700 md:text-base w-[80%] pb-3">
            We believe that in a world where millions go hungry while tons of
            food are wasted, there is an urgent need for collective action.
          </p>
          <p className="space-x-2">
            <Link
              to={"/available-foods"}
              className="bg-[#f01543] rounded-md px-4 py-2 text-white"
            >
              Foods
            </Link>
            <Link
              to={"/blogs"}
              className="rounded-md px-4 py-[7px] border border-[#f01543] ml-1"
            >
              Blogs
            </Link>
            <Link
              to={"/all-reviews"}
              className="rounded-md px-4 py-[7px] border border-[#f01543] ml-1"
            >
              Reviews
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
