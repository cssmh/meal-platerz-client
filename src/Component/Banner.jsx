import { Link } from "react-router-dom";
import BannerImg from "../assets/food-banner.jpg";

const Banner = () => {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="900"
      data-aos-anchor-placement="top-bottom"
      className="hero min-h-[60vh] lg:min-h-[80vh] bg-cover relative -top-[59px]"
      style={{
        backgroundImage: `url(${BannerImg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="hero-overlay bg-opacity-60 md:bg-opacity-0"></div>
      <div className="max-w-2xl mr-auto ml-4 md:ml-12 text-white md:text-black">
        <div className="space-y-3">
          <h1 className="text-2xl md:text-4xl font-semibold flex-11">
            Building Communities <br /> by Sharing Excess Food <br /> Resources
          </h1>
          <p className="w-[80%]">
            Our mission is simple yet profound: to build resilient communities
            by fostering the sharing of excess food resources. We believe that
            in a world where millions go hungry while tons of food are wasted,
            there is an urgent need for collective action
          </p>
          <p>
            <Link className="bg-redFood rounded-md px-4 py-2 text-white">
              Foods
            </Link>
            <Link
              to={"/blogs"}
              className="rounded-md px-4 py-[7px] border border-redFood ml-1"
            >
              Blogs
            </Link>
            <Link
              to={"/all-reviews"}
              className="rounded-md px-4 py-[7px] border border-redFood ml-1"
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
