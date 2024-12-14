import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { useEffect, useState } from "react";
import BigLoader from "../Component/BigLoader";
import FooterOld from "../Component/FooterOld";

const MainLayout = () => {
  const loc = useLocation();
  const [loading, setLoading] = useState(true);
  const home = loc.pathname === "/";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  // if (loading) return <BigLoader />;

  return (
    <div>
      <Navbar />
      <div className="min-h-[70vh]">
        <Outlet />
      </div>
      {home ? <Footer /> : <FooterOld />}
    </div>
  );
};

export default MainLayout;
