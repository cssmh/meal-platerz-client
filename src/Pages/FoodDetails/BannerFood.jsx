import foodBanner from "../../assets/detailFood.jpg";
const BannerFood = () => {
  return (
    <div
      className="hero min-h-[30vh] md:min-h-[50vh] bg-cover"
      style={{
        backgroundImage: `url(${foodBanner})`,
        backgroundSize: "cover",
      }}
    >
      <div className="hero-overlay bg-opacity-50"></div>
      <div className="max-w-2xl mr-auto ml-6 md:ml-20 text-white">
        <div className="space-y-3">
          <h1 className="text-2xl md:text-4xl font-semibold">
            Menu Details
          </h1>
          <p className="w-[80%]">Home</p>
        </div>
      </div>
    </div>
  );
};

export default BannerFood;
