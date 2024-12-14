import PlaterHelmet from "./PlaterHelmet";
import { FaRegClock } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { AiOutlineFileText } from "react-icons/ai";

const Blogs = () => {
  return (
    <div className="bg-gray-100 py-6">
      <PlaterHelmet title={"Blogs"} />
      <div className="max-w-7xl 2xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl md:text-3xl font-bold text-center mb-8">
          Community Food Sharing Blogs
        </h1>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gradient-to-r from-indigo-200 to-indigo-50 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <div className="relative">
              <img
                src="https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574"
                alt="Blog Post"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4">
                <h2 className="text-lg md:text-xl font-bold text-white">
                  Blog Platerz 1
                </h2>
              </div>
            </div>
            <div className="p-5">
              <p className="text-gray-700 mb-4">
                Learn how MealPlaterz empowers communities by reducing food
                waste and fostering sustainability through innovative food
                sharing initiatives.
              </p>
              <div className="flex items-center justify-between text-gray-600 text-sm">
                <div className="flex items-center">
                  <FaRegClock className="mr-1" /> 5 min read
                </div>
                <div className="flex items-center">
                  <BsPeople className="mr-1" /> by Alice
                </div>
                <div className="flex items-center">
                  <AiOutlineFileText className="mr-1" /> Sustainability
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-200 to-green-50 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <div className="relative">
              <img
                src="https://www.wfla.com/wp-content/uploads/sites/71/2023/04/GettyImages-1407832840.jpg?w=2560&h=1440&crop=1"
                alt="Blog Post"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4">
                <h2 className="text-lg md:text-xl font-bold text-white">
                  Blog Platerz 2
                </h2>
              </div>
            </div>
            <div className="p-5">
              <p className="text-gray-700 mb-4">
                Discover how MealPlaterz connects local communities, creating a
                positive impact on both the environment and human lives.
              </p>
              <div className="flex items-center justify-between text-gray-600 text-sm">
                <div className="flex items-center">
                  <FaRegClock className="mr-1" /> 7 min read
                </div>
                <div className="flex items-center">
                  <BsPeople className="mr-1" /> by Bob
                </div>
                <div className="flex items-center">
                  <AiOutlineFileText className="mr-1" /> Community
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-200 to-yellow-50 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <div className="relative">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxRmYX4OqLGoOrbQXe2XFcDAbNphmu7dgkdQ&s"
                alt="Blog Post"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4">
                <h2 className="text-lg md:text-xl font-bold text-white">
                  Blog Platerz 3
                </h2>
              </div>
            </div>
            <div className="p-5">
              <p className="text-gray-700 mb-4">
                Dive into our mission to reduce food waste and how it fosters
                stronger community connections.
              </p>
              <div className="flex items-center justify-between text-gray-600 text-sm">
                <div className="flex items-center">
                  <FaRegClock className="mr-1" /> 6 min read
                </div>
                <div className="flex items-center">
                  <BsPeople className="mr-1" /> by Charlie
                </div>
                <div className="flex items-center">
                  <AiOutlineFileText className="mr-1" /> Environment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
