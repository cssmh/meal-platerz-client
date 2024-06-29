import { Helmet } from "react-helmet-async";
import FeaturedFoods from "../../Pages/FeaturedFoods/FeaturedFoods";
import Banner from "../Banner/Banner";
import Stats from "../Stats/Stats";
import WeOffer from "../WeOffer/WeOffer";
import AppStore from "../AppStore";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>MealPlaterz | Home</title>
      </Helmet>
      <Banner />
      <FeaturedFoods />
      <WeOffer />
      <AppStore />
      <Stats />
    </div>
  );
};

export default Home;
