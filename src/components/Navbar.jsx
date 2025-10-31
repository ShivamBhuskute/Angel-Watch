import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <nav className="fixed top-0 left-0 z-10 w-full bg-gray-800 p-2 shadow-md">
      <div className="flex items-center">
        {/* Back Button */}
        <button 
          onClick={handleBackClick} 
          className="text-white text-lg font-semibold hover:bg-gray-700 p-2 rounded-md focus:outline-none"
        >
          &#8592; Back
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
