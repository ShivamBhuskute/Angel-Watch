import { useNavigate } from "react-router-dom";
import LiveLocation from "../assets/LiveLocation.png";

function LFLiveLocation() {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate("/accountPage");
  };

  const handleNext = () => {
    navigate("/emergency-contacts");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-400 via-pink-300 to-blue-200 text-rose-900 flex flex-col items-center justify-center text-center p-6 relative">
      {/* Animated Location Image */}
      <img
        src={LiveLocation}
        alt="Live Location"
        className="h-64 mb-4 rounded-lg transform transition-transform duration-700 hover:scale-110 animate__animated animate__zoomIn"
      /> 

      {/* Heading with animation */}
      <h2 className="text-3xl font-extrabold mb-3 animate__animated animate__fadeInDown">
        Live Location Sharing & Tracking
      </h2>

      {/* Description with subtle animation */}
      <p className="text-lg mb-6 opacity-80 animate__animated animate__fadeInUp">
        Share your real-time location with trusted contacts and enable seamless tracking for added safety.
      </p>

      {/* Animated Buttons */}
      <div className="absolute bottom-8 flex space-x-44 animate__animated animate__fadeIn">
        <button
          onClick={handleSkip}
          className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-6 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Skip
        </button>
        <button
          onClick={handleNext}
          className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-6 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default LFLiveLocation;
