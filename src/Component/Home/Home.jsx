import Banner from "../../assets/banner.png";
const Home = () => {
  return (
    <div>
      <div
        className="hero min-h-[80vh] bg-cover"
        style={{
          backgroundImage: `url(${Banner})`,
          backgroundSize: "cover",
        }}
      >
        <div className="hero-overlay bg-opacity-20"></div>
        <div className="text-white max-w-2xl mr-auto ml-4 md:ml-12">
          <div className="space-y-3">
            <h1 className="text-2xl md:text-4xl font-bold flex-11">
              Building Communities <br /> by Sharing Excess Food <br />{" "}
              Resources
            </h1>
            <p>
              Our mission is simple yet profound: to build resilient communities
              by fostering the sharing of excess food resources. We believe that
              in a world where millions go hungry while tons of food are wasted,
              there is an urgent need for collective action
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
