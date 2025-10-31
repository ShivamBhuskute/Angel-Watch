import { useNavigate } from "react-router-dom";
import AlertBellImage from "../assets/AlertBellImage.png"; // Renamed import

function AlertBellComponent() {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate("/accountPage"); // Navigate to the account page
  };

  const handleNext = () => {
    navigate("/accountPage"); // Navigate to the next page (EmergencyContacts)
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-400 via-pink-300 to-blue-200 text-rose-900 flex flex-col items-center justify-center text-center p-4 relative">
      {/* Animated Alert Bell Image */}
      <img
        src={AlertBellImage} // Use the renamed variable
        alt="Alert Bell"
        className="h-72 mb-4 rounded-lg transform transition-transform duration-700 hover:scale-110 animate__animated animate__zoomIn"
      />

      {/* Heading with animation */}
      <h2 className="text-3xl font-bold mb-3 animate__animated animate__fadeInDown">
        Alert Bell
      </h2>

      {/* Description with subtle animation */}
      <p className="text-lg mb-6 opacity-80 animate__animated animate__fadeInUp">
        Trigger a loud alert sound to draw attention and signal for help in distressing situations.
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

export default AlertBellComponent;
