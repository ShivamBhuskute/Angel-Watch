// import React from "react";

// function SplashScreen() {
//   return (
//     <div className="flex flex-col h-screen items-center justify-center bg-[#4c1631] text-white">
//       {/* Logo Section */}
//       <div className="flex items-center justify-center mb-4">
//         <img
//           src="/path-to-your-logo.png"
//           alt="SafeGuardHer Logo"
//           className="w-20 h-20 md:w-28 md:h-28 animate-bounce"
//         />
//       </div>

//       {/* Title Section */}
//       <h1 className="text-2xl md:text-4xl font-bold tracking-wide mb-2">
//         SafeGuardHer
//       </h1>
//       <p className="text-sm md:text-lg tracking-wide">Women Safety App</p>

//       {/* Loading Bar Section */}
//       <div className="w-3/4 md:w-1/2 h-2 mt-8 bg-gray-300 rounded-full overflow-hidden relative">
//         {/* Shimmering effect */}
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent h-full animate-shimmer"></div>
//       </div>

//       {/* Footer Section */}
//       <p className="absolute bottom-4 text-xs md:text-sm">
//         © 2024 SafeGuardHer
//       </p>
//     </div>
//   );
// }

// export default SplashScreen;





// // LandingPage.js (Updated version of the first page)
// // import React from "react";
// import { useNavigate } from "react-router-dom";

// function LandingPage() {
//   const navigate = useNavigate();

//   const handleNext = () => {
//     navigate("/gesture-sos"); // Navigate to the next page (GestureSOS)
//   };

//   return (
//     <div className="flex flex-col h-screen items-center justify-center bg-[#4c1631] text-white">
//       <div className="flex items-center justify-center mb-4">
//         <img
//           src="/path-to-your-logo.png"
//           alt="SafeGuardHer Logo"
//           className="w-20 h-20 md:w-28 md:h-28 animate-bounce"
//         />
//       </div>

//       <h1 className="text-4xl md:text-6xl font-bold tracking-wide mb-2">
//         SafAura
//       </h1>
//       <p className="text-md md:text-xl tracking-wide">Women Safety App</p>



//       <div className="absolute bottom-4 flex space-x-4">

//         <button
//           onClick={handleNext}
//           className="bg-green-500 text-white py-2 px-6 rounded-md"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;




import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

function LandingPage() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/gesture-sos"); // Navigate to the next page (GestureSOS)
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gradient-to-b from-rose-400 via-pink-300 to-blue-200 text-rose-900">
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-4 animate-fadeIn">
        <img
          src={logo}
          alt="AngelWatch Logo"
          className="h-64 md:h-50 animate-zoomInOut drop-shadow-lg"
        />
      </div>

      {/* Title and Subtitle */}
      <h1 className="text-5xl md:text-6xl font-bold tracking-wider mb-2 drop-shadow-md animate-fadeIn delay-200">
        AngelWatch
      </h1>
      <p className="text-xl md:text-2xl font-semibold tracking-wide drop-shadow-sm animate-fadeIn delay-400">
        Your Safety, Our Priority
      </p>

      {/* Decorative Divider (optional) */}
      {/* <div className="w-2/3 h-1 bg-white rounded-full my-6 animate-fadeIn delay-600"></div> */}

      {/* Next Button */}
      <div className="absolute bottom-8 flex space-x-4 animate__animated animate__fadeIn">
        <button
          onClick={handleNext}
          className="bg-rose-500 hover:bg-rose-600 text-white py-3 px-8 rounded-md shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
