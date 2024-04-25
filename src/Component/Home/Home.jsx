import { Helmet } from "react-helmet-async";
import FeaturedFoods from "../../Pages/FeaturedFoods/FeaturedFoods";
import Banner from "../Banner/Banner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>MealPlaterz | Home</title>
      </Helmet>
      <Banner></Banner>
      <FeaturedFoods></FeaturedFoods>
    </div>
  );
};

export default Home;
