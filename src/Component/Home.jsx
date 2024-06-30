import { Helmet } from "react-helmet-async";
import FeaturedFoods from "../Pages/FeaturedFoods/FeaturedFoods";
import Banner from "./Banner";
import Stats from "./Stats";
import WeOffer from "./WeOffer";
import AppStore from "./AppStore";
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
      <AppStore />
      <OurClient />
      <Stats />
    </div>
  );
};

export default Home;
