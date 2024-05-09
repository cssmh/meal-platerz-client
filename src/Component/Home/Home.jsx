import { Helmet } from "react-helmet-async";
import FeaturedFoods from "../../Pages/FeaturedFoods/FeaturedFoods";
import Banner from "../Banner/Banner";
import Stats from "../Stats/Stats";
import WeOffer from "../WeOffer/WeOffer";
import Solution from "../Solution/Solution";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>MealPlaterz | Home</title>
      </Helmet>
      <Banner></Banner>
      <FeaturedFoods></FeaturedFoods>
      <Solution></Solution>
      <Stats></Stats>
      <WeOffer></WeOffer>
    </div>
  );
};

export default Home;
