import { FaRegCircleCheck } from "react-icons/fa6";

const WeOffer = () => {
  return (
    <div className="my-10">
      <h2
        data-aos="zoom-in-down"
        data-aos-duration="500"
        className="mb-8 text-2xl 2xl:text-3xl font-semibold leading-none text-center px-3 md:px-0"
      >
        What do we have to offer<span className="text-[#f01543]">?</span>
      </h2>
      <div className="max-w-6xl 2xl:max-w-[80%] mx-auto flex  flex-col md:flex-row justify-between gap-6 px-5 md:px-0">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <FaRegCircleCheck className="text-2xl text-red-500" />
            <span className="2xl:text-lg">Easy Sharing</span>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <FaRegCircleCheck className="text-2xl text-red-500" />
            <span className="2xl:text-lg">Support Local Chefs</span>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <FaRegCircleCheck className="text-2xl text-red-500" />
            <span className="2xl:text-lg">Reducing Food Waste</span>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <FaRegCircleCheck className="text-2xl text-red-500" />
            <span className="2xl:text-lg">Home-cooked Meals Delivery</span>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <FaRegCircleCheck className="text-2xl text-red-500" />
            <span className="2xl:text-lg">Meal Prep Flexibility</span>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <FaRegCircleCheck className="text-2xl text-red-500" />
            <span className="2xl:text-lg">Community Food Sharing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeOffer;
