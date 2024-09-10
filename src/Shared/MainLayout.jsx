import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { useEffect, useState } from "react";
import BigLoader from "../Component/BigLoader";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
    // Clean up the timeout on component unmount
  }, []);

  if (loading) return <BigLoader />;

  return (
    <div>
      <Navbar />
      <div className="min-h-[70vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
