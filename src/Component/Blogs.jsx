import banner from "../assets/Banner.jpg";
import { FaRegClock } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { AiOutlineFileText } from "react-icons/ai";
import { Helmet } from "react-helmet-async";

const Blogs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 py-10">
      <Helmet>
        <title>MealPlaterz - Blogs</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-semibold text-center text-white mb-12">
          Community Food Sharing Blogs
        </h1>
        <div className="space-y-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex flex-col md:flex-row">
                <img
                  src={banner}
                  alt="Blog Post"
                  className="w-full md:w-1/3 h-64 object-cover"
                />
                <div className="p-5 flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    Blog Platerz {index + 1}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    MealPlaterz is a pioneering platform that empowers
                    communities through the innovative concept of food sharing.
                    In a world where food waste is a significant issue,
                    MealPlaterz offers a practical solution by connecting
                    community members and facilitating the redistribution of
                    surplus food. Our mission is to reduce food waste while
                    fostering community connections and promoting
                    sustainability. The platform provides an easy-to-use
                    interface where users can post available food items, browse
                    listings, and connect with others in their local area. By
                    enabling the sharing of surplus food, MealPlaterz ensures
                    that excess food reaches those who need it, rather than
                    ending up in landfills.
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
