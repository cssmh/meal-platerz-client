import { Helmet } from "react-helmet-async";
import FeaturedFoods from "../../Pages/FeaturedFoods/FeaturedFoods";
import Banner from "../Banner/Banner";
import Stats from "../Stats/Stats";
import WeOffer from "../WeOffer/WeOffer";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>MealPlaterz | Home</title>
      </Helmet>
      <Banner></Banner>
      <FeaturedFoods></FeaturedFoods>
      <Stats></Stats>
      <WeOffer></WeOffer>
    </div>
  );
};

export default Home;
