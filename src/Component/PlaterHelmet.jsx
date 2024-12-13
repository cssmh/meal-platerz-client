import { Helmet } from "react-helmet-async";

const PlaterHelmet = ({ title }) => {
  return (
    <Helmet>
      <title>{title} - MealPlaterz</title>
    </Helmet>
  );
};

export default PlaterHelmet;
