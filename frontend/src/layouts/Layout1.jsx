import { useState } from "react";
import { Sidebar } from "../components/Sidebar/sidebar";
import './layout1.css';

export const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="layout-container">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`home-section ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
};
