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
        <title>MealPlaterz | Home</title>
      </Helmet>
      <Banner />
      <FeaturedFoods />
      <WeOffer />
      <OurApp />
      <OurClient />
      <Stats />
    </div>
  );
};

export default Home;
