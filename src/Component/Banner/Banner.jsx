import { Link } from "react-router-dom";
import BannerBG from "../../assets/Banner.jpg";
const Banner = () => {
  return (
    <div>
      <div
        className="hero min-h-[60vh] lg:min-h-[80vh] bg-cover"
        style={{
          backgroundImage: `url(${BannerBG})`,
          backgroundSize: "cover",
        }}
      >
        <div className="hero-overlay bg-opacity-5"></div>
        <div className="max-w-2xl mr-auto ml-4 md:ml-12">
          <div className="space-y-3">
            <h1 className="text-2xl md:text-4xl font-bold flex-11">
              Building Communities <br /> by Sharing Excess Food <br />{" "}
              Resources
            </h1>
            <p className="w-[80%]">
              Our mission is simple yet profound: to build resilient communities
              by fostering the sharing of excess food resources. We believe that
              in a world where millions go hungry while tons of food are wasted,
              there is an urgent need for collective action
            </p>
            <p>
              <Link>
                <button className="bg-redFood rounded-md px-4 py-2 text-white">
                  Foods
                </button>
              </Link>
              <Link>
                <button className="rounded-md px-4 py-[7px] border border-redFood ml-1">
                  Blogs
                </button>
              </Link>
              <Link>
                <button className="rounded-md px-4 py-[7px] border border-redFood ml-1">
                  Reviews
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
