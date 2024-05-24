import { useState } from "react";
import { useResponsiveContext } from "../../hooks/useResponsiveContext";
import { Navbar } from "../../components/external/Navbar/Navbar";
import { Footer } from "../../components/external/Footer/Footer";
import "./layout2.css";

export const Layout2 = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { isTouchScreen } = useResponsiveContext();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (isTouchScreen) 
  {
    return (
      <div className="layout2">
        <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className="section2-mobile">{children}</div>
        <Footer isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>
    );
  }

  return (
    <div className="layout2">
      <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={"section2"}>{children}</div>
      <Footer isOpen={isOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};
