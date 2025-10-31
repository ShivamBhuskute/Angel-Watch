import React from "react";
import { PhoneIcon, MailIcon, QuestionMarkCircleIcon } from "@heroicons/react/solid";
import NavBar from "../components/Navbar"; // Make sure your NavBar component is correctly imported

const faqs = [
  {
    question: "How do I use the emergency button?",
    answer:
      "Press the emergency button to send an alert with your current location to trusted contacts and emergency services."
  },
  {
    question: "What should I do if I feel unsafe?",
    answer:
      "Immediately use the emergency button, call local authorities, or find a safe location while notifying a friend or family member."
  },
  {
    question: "How do I update my safety preferences?",
    answer:
      "Go to your settings and update the emergency contacts and your preferences for notifications."
  },
  {
    question: "What is the best way to stay safe while traveling?",
    answer:
      "Share your travel itinerary with trusted people, avoid walking alone at night, and stay aware of your surroundings."
  }
];

const HelpSection = () => {
  return (
    <div>
      {/* Navbar */}
      <NavBar />

      {/* Main Content */}
      <div className="min-h-screen bg-pink-50 mt-14 p-6">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-semibold text-center text-pink-700 mb-8">Help & Support</h1>

          {/* FAQs Section */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-pink-600">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-6 border border-pink-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start mb-4">
                    <QuestionMarkCircleIcon className="h-8 w-8 text-pink-500 mr-4" />
                    <h3 className="text-xl font-medium text-gray-800">{faq.question}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-pink-600 mb-6">Need More Help?</h2>
            <p className="text-gray-700 mb-6">
              For urgent matters, please contact our support team directly:
            </p>
            <div className="space-y-6">
              <div className="flex items-center">
                <MailIcon className="h-7 w-7 text-pink-500 mr-4" />
                <p className="text-lg font-medium text-gray-800">support@womensafetyapp.com</p>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="h-7 w-7 text-pink-500 mr-4" />
                <p className="text-lg font-medium text-gray-800">+1 (800) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Responsiveness */}
      <style jsx>{`
        @media (max-width: 640px) {
          h1 {
            font-size: 2rem;
          }
          h2 {
            font-size: 1.75rem;
          }
          .p-6 {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HelpSection;
