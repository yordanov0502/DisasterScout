import { useState } from "react";
import { useResponsiveContext } from "../../hooks/useResponsiveContext";
import { Sidebar } from "../../components/internal/Sidebar";
import { MainSpeedDial } from "../../components/internal/MainSpeenDial";
import "./layout1.css";

export const Layout1 = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { isTouchScreen } = useResponsiveContext();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (isTouchScreen) 
  {
    return (
      <div className="layout1">
        <MainSpeedDial />
        <div className="section1-mobile">{children}</div>
      </div>
    );
  }

  return (
    <div className="layout1">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`section1 ${isOpen ? "shrank" : ""}`}>{children}</div>
    </div>
  );
};
