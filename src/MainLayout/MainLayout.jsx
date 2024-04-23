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
        <div className="flex justify-center min-h-[70vh] mt-5">
          <div className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <DotLoader color="#36d7b7" />
            <p className="text-white">Loading...</p>
          </div>
        </div>
      ) : (
        <div className="min-h-[40vh] md:min-h-[70vh]">
          <Outlet></Outlet>
        </div>
      )}
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
