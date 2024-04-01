import { useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import "./layout1.css";

export const Layout1 = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="layout1">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`section1 ${isOpen ? "shrank" : ""}`}>{children}</div>
    </div>
  );
};
