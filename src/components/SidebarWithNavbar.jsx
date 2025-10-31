import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated to useNavigate
import { getAuth, signOut } from 'firebase/auth';
import { FaUser, FaPhoneAlt, FaHistory, FaShieldAlt, FaLifeRing, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa';

const SidebarWithNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // Updated to useNavigate
  const auth = getAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/accountPage'); // Redirect to account page after logout
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  // Navigate to a specific route
  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center fixed top-0 right-0 w-full z-40">
        <div className="text-xl">AngleWatch</div>

        <div className="text-2xl cursor-pointer" onClick={toggleSidebar}>
          <FaBars /> {/* Hamburger Icon */}
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-gray-800 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`} // Ensure z-index is high here
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleSidebar} className="text-white text-2xl">
            &times;
          </button>
        </div>
        <ul className="space-y-4 p-4">
          <li className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigate('/profile')}>
            <FaUser />
            <span>Profile</span>
          </li>
          <li className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigate('/addContacts')}>
            <FaPhoneAlt />
            <span>My Trusted Contacts</span>
          </li>
          <li className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigate('/recording-history')}>
            <FaHistory />
            <span>Recording History</span>
          </li>
          <li className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigate('/safety-tips')}>
            <FaShieldAlt />
            <span>Safety Tips</span>
          </li>
          <li className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigate('/helpSection')}>
            <FaLifeRing />
            <span>Help</span>
          </li>
          <li className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigate('/settingSection')}>
            <FaCog />
            <span>Settings</span>
          </li>
        </ul>
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg focus:outline-none"
          >
            <FaSignOutAlt className="inline-block mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarWithNavbar;










// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Update to useNavigate
// import { getAuth, signOut } from 'firebase/auth';
// import { FaUser, FaPhoneAlt, FaHistory, FaShieldAlt, FaLifeRing, FaCog, FaSignOutAlt } from 'react-icons/fa';

// const Sidebar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const navigate = useNavigate(); // Updated to useNavigate
//   const auth = getAuth();

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigate('/accountPage'); // Redirect to account page after logout
//     } catch (error) {
//       console.error('Error logging out: ', error);
//     }
//   };

//   // Navigate to a specific route
//   const handleNavigate = (route) => {
//     navigate(route);
//   };

//   return (
//     <div className="relative">
//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transform ${
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } transition-transform duration-300 ease-in-out z-50`}
//       >
//         <div className="flex justify-end p-4">
//           <button onClick={toggleSidebar} className="text-white text-2xl">
//             &times;
//           </button>
//         </div>
//         <ul className="space-y-4 p-4">
//           <li className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigate('/profile')}>
//             <FaUser />
//             <span>Profile</span>
//           </li>
//           <li className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigate('/trusted-contacts')}>
//             <FaPhoneAlt />
//             <span>My Trusted Contacts</span>
//           </li>
//           <li className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigate('/recording-history')}>
//             <FaHistory />
//             <span>Recording History</span>
//           </li>
//           <li className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigate('/safety-tips')}>
//             <FaShieldAlt />
//             <span>Safety Tips</span>
//           </li>
//           <li className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigate('/help')}>
//             <FaLifeRing />
//             <span>Help</span>
//           </li>
//           <li className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigate('/settings')}>
//             <FaCog />
//             <span>Settings</span>
//           </li>
//         </ul>
//         <div className="absolute bottom-0 w-full p-4">
//           <button
//             onClick={handleLogout}
//             className="w-full px-4 py-2 bg-red-500 text-white rounded-lg focus:outline-none"
//           >
//             <FaSignOutAlt className="inline-block mr-2" />
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Hamburger Icon */}
//       <div
//         className="fixed top-4 left-4 text-white text-3xl z-40 cursor-pointer"
//         onClick={toggleSidebar}
//       >
//         &#8226;&#8226;&#8226; {/* Three dots */}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
