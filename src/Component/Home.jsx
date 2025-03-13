import { Helmet } from "react-helmet-async";
import FeaturedFoods from "../Pages/FeaturedFoods";
import Banner from "./Banner";
import Stats from "./Stats";
import WeOffer from "./WeOffer";
import OurApp from "./OurApp";
import OurClient from "./OurClient";
import BePremium from "./BePremium";
import PlateReview from "../Pages/PlateReview";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Share Food Build Community</title>
      </Helmet>
      <Banner />
      <FeaturedFoods />
      <BePremium />
      <WeOffer />
      <OurApp />
      <OurClient />
      <Stats />
      <PlateReview />
    </div>
  );
};

export default Home;
