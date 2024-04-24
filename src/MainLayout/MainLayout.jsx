import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Footer/Footer";
import { DotLoader } from "react-spinners";

const MainLayout = () => {
  const navigationForSpinner = useNavigation();
  return (
    <div>
      <Navbar></Navbar>
      {navigationForSpinner.state === "loading" ? (
        <p>loading</p>
      ) : (
        <div className="min-h-[70vh]">
          <Outlet></Outlet>
        </div>
      )}
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
