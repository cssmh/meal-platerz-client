import { Helmet } from "react-helmet-async";
import FeaturedFoods from "../Pages/FeaturedFoods/FeaturedFoods";
import Banner from "./Banner";
import Stats from "./Stats";
import WeOffer from "./WeOffer";
import AppStore from "./AppStore";
import Client from "./Client";

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
      <Client />
      <Stats />
    </div>
  );
};

export default Home;
