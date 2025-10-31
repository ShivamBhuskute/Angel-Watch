import React from "react";
import { 
  FaShieldAlt, FaPhone, FaMapMarkerAlt, FaUserShield, FaBullhorn, FaCogs, 
  FaStreetView, FaAppStore, FaHandRock, FaBalanceScale, FaRunning, FaSearch, 
  FaLightbulb, FaDoorOpen, FaBell, FaWalking, FaShieldVirus 
} from "react-icons/fa";
import NavBar from "./Navbar";

const safetyTips = [
  { title: "Trust Your Instincts", icon: <FaShieldAlt />, content: "Always trust your instincts. If something feels off, get away from the situation." },
  { title: "Stay Connected", icon: <FaPhone />, content: "Keep your phone fully charged and easily accessible." },
  { title: "Share Your Plans", icon: <FaMapMarkerAlt />, content: "Share your plans with someone you trust, including your location." },
  { title: "Be Cautious Online", icon: <FaUserShield />, content: "Be cautious about the information you share online." },
  { title: "Learn Self-Defense", icon: <FaBullhorn />, content: "Learn basic self-defense techniques." },
  { title: "Avoid Distractions", icon: <FaCogs />, content: "Avoid distractions, such as using your phone when walking alone." },
  { title: "Walk Safely at Night", icon: <FaStreetView />, content: "Use well-lit and populated paths when walking at night." },
  { title: "Install Safety Apps", icon: <FaAppStore />, content: "Install a personal safety app with emergency features." },
  { title: "Use Bright Lighting", icon: <FaLightbulb />, content: "Keep entryways and parking areas well-lit to deter attackers." },
  { title: "Lock Doors and Windows", icon: <FaDoorOpen />, content: "Always lock your doors and windows when at home or in your car." },
  { title: "Carry a Safety Alarm", icon: <FaBell />, content: "Carry a personal safety alarm to attract attention during emergencies." },
  { title: "Stay Alert", icon: <FaWalking />, content: "Stay aware of your surroundings and avoid isolated areas when alone." }
];

const selfDefenseTips = [
  { title: "Aim for Vulnerable Areas", icon: <FaHandRock />, content: "Focus on striking sensitive areas like the eyes, nose, or groin." },
  { title: "Maintain Balance", icon: <FaBalanceScale />, content: "Keep a strong stance to maintain balance during an attack." },
  { title: "Use Everyday Objects", icon: <FaSearch />, content: "Keys, bags, or pens can be used as improvised weapons for defense." },
  { title: "Escape When Possible", icon: <FaRunning />, content: "Prioritize escaping the situation over fighting back." },
  { title: "Practice Awareness", icon: <FaShieldVirus />, content: "Stay aware of potential threats and plan exit strategies." },
  { title: "Control Breathing", icon: <FaBullhorn />, content: "Stay calm and control your breathing to think clearly during a confrontation." },
  { title: "Create Distance", icon: <FaStreetView />, content: "Keep a safe distance from strangers and be prepared to react quickly." },
  { title: "Use Your Voice", icon: <FaBell />, content: "Shout loudly to attract attention and intimidate the attacker." }
];

const SafetyTips = () => {
  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-white mt-14 p-6">
        {/* Safety Tips Section */}
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-pink-600 mb-6">
            Women's Safety Tips
          </h1>
          <ul className="space-y-6">
            {safetyTips.map((tip, index) => (
              <li
                key={index}
                className="p-6 bg-pink-50 border border-pink-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-pink-500 text-3xl">{tip.icon}</div>
                  <h2 className="text-xl font-medium text-pink-700">{tip.title}</h2>
                </div>
                <p className="text-gray-700 mt-2">{tip.content}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Spacer */}
        <div className="h-12"></div>

        {/* Self-Defense Tips Section */}
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-pink-600 mb-6">
            Self-Defense Tips for Women
          </h1>
          <ul className="space-y-6">
            {selfDefenseTips.map((tip, index) => (
              <li
                key={index}
                className="p-6 bg-pink-50 border border-pink-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-pink-500 text-3xl">{tip.icon}</div>
                  <h2 className="text-xl font-medium text-pink-700">{tip.title}</h2>
                </div>
                <p className="text-gray-700 mt-2">{tip.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SafetyTips;
