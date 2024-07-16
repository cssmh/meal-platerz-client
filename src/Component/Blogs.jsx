import bannerImg from "../assets/food-banner.jpg";
import { FaRegClock } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { AiOutlineFileText } from "react-icons/ai";
import { Helmet } from "react-helmet-async";

const Blogs = () => {
  return (
    <div className="bg-gray-100 py-6">
      <Helmet>
        <title>MealPlaterz - Blogs</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          Community Food Sharing Blogs
        </h1>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Blog Post 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
              src={bannerImg}
              alt="Blog Post"
              className="w-full h-64 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Blog Platerz 1
              </h2>
              <p className="text-gray-600 mb-4">
                MealPlaterz is a pioneering platform that empowers communities
                through the innovative concept of food sharing. In a world where
                food waste is a significant issue, MealPlaterz offers a
                practical solution by connecting community members and
                facilitating the redistribution of surplus food.
              </p>
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <div className="flex items-center">
                  <FaRegClock className="mr-1" /> 5 min read
                </div>
                <div className="flex items-center">
                  <BsPeople className="mr-1" /> by Tourist
                </div>
                <div className="flex items-center">
                  <AiOutlineFileText className="mr-1" /> Category
                </div>
              </div>
            </div>
          </div>
          {/* Blog Post 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
              src={bannerImg}
              alt="Blog Post"
              className="w-full h-64 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Blog Platerz 2
              </h2>
              <p className="text-gray-600 mb-4">
                MealPlaterz offers an easy-to-use interface where users can post
                available food items, browse listings, and connect with others
                in their local area. By enabling the sharing of surplus food,
                MealPlaterz ensures that excess food reaches those who need it,
                rather than ending up in landfills.
              </p>
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <div className="flex items-center">
                  <FaRegClock className="mr-1" /> 7 min read
                </div>
                <div className="flex items-center">
                  <BsPeople className="mr-1" /> by Foodie
                </div>
                <div className="flex items-center">
                  <AiOutlineFileText className="mr-1" /> Category
                </div>
              </div>
            </div>
          </div>
          {/* Blog Post 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
              src={bannerImg}
              alt="Blog Post"
              className="w-full h-64 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Blog Platerz 3
              </h2>
              <p className="text-gray-600 mb-4">
                Our mission is to reduce food waste while fostering community
                connections and promoting sustainability. MealPlaterz connects
                community members and facilitates the redistribution of surplus
                food, ensuring excess food reaches those who need it.
              </p>
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <div className="flex items-center">
                  <FaRegClock className="mr-1" /> 6 min read
                </div>
                <div className="flex items-center">
                  <BsPeople className="mr-1" /> by Chef
                </div>
                <div className="flex items-center">
                  <AiOutlineFileText className="mr-1" /> Category
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
