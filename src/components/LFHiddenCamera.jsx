import { useNavigate } from "react-router-dom";
import HiddenCameraImage from "../assets/HiddenCamera.png";

function HiddenCamera() {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate("/accountPage"); // Navigate to the home page (SplashScreen)
  };

  const handleNext = () => {
    navigate("/alert-bell"); // Navigate to the next page (Live Audio)
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-400 via-pink-300 to-blue-200 text-rose-900 flex flex-col items-center justify-center text-center p-6 relative">
      {/* Animated Hidden Camera Image */}
      <img
        src={HiddenCameraImage}
        alt="Hidden Camera"
        className="h-64 mb-4 rounded-lg animate__animated animate__zoomIn"
      />

      {/* Animated Title */}
      <h2 className="text-3xl font-extrabold mb-3 animate__animated animate__fadeInDown">
        Hidden Camera
      </h2>

      {/* Animated Description */}
      <p className="text-lg mb-6 opacity-80 animate__animated animate__fadeInUp">
        Record videos discreetly using the hidden camera feature for gathering evidence when needed.
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

export default HiddenCamera;
