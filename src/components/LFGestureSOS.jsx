// import React from "react";

// function GestureSOS() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-800 via-blue-600 to-blue-300 text-white flex flex-col items-center justify-center text-center p-4">
//       <img
//         src="https://source.unsplash.com/400x400/?gesture,alert"
//         alt="Gesture SOS"
//         className="w-60 h-60 mb-4 rounded-lg shadow-lg"
//       />
//       <h2 className="text-3xl font-bold mb-2">Gesture-Based SOS Activation</h2>
//       <p className="text-lg">
//         Activate emergency alerts quickly using simple hand gestures, ensuring
//         immediate assistance when you need it most.
//       </p>
//     </div>
//   );
// }

// export default GestureSOS;





import { useNavigate } from "react-router-dom";
import 'animate.css'; // Importing animate.css for animations
import SOS from "../assets/SOS.png"

function LFGestureSOS() {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate("/accountPage");
  };

  const handleNext = () => {
    navigate("/live-location");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-400 via-pink-300 to-blue-200 text-rose-900 flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
      {/* Animated Image */}
      <img
        src={SOS}
        alt="Gesture SOS"
        className="w-60 h-60 mb-6 rounded-lg  animate__animated animate__zoomIn"
      />

      {/* Title */}
      <h2 className="text-3xl font-bold mb-2 animate__animated animate__fadeInDown">
        Gesture-Based SOS Activation
      </h2>

      {/* Description */}
      <p className="text-lg mb-6 animate__animated animate__fadeInUp">
        Activate emergency alerts quickly using simple hand gestures, ensuring immediate assistance when you need it most.
      </p>

      {/* Buttons */}
      <div className="absolute bottom-8 flex space-x-44 animate__animated animate__fadeIn">
        <button
          onClick={handleSkip}
          className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-6 rounded-md transition transform hover:scale-105 animate__animated animate__fadeIn"
        >
          Skip
        </button>
        <button
          onClick={handleNext}
          className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-6 rounded-md transition transform hover:scale-105 animate__animated animate__fadeIn"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default LFGestureSOS;
