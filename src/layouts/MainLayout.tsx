import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/shared/Navbar";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
