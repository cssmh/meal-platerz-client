import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[70vh]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
