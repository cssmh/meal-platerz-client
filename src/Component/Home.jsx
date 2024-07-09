import { Helmet } from "react-helmet-async";
import FeaturedFoods from "../Pages/FeaturedFoods/FeaturedFoods";
import Banner from "./Banner";
import Stats from "./Stats";
import WeOffer from "./WeOffer";
import OurApp from "./OurApp";
import OurClient from "./OurClient";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>MealPlaterz Home - Community Food Sharing</title>
      </Helmet>
      <Banner />
      <FeaturedFoods />
      <OurApp />
      <WeOffer />
      <OurClient />
      <Stats />
    </div>
  );
};

export default Home;
