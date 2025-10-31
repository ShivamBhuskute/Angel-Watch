import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaHome, FaHeartbeat, FaEdit } from "react-icons/fa"; // Import icons
import { motion } from "framer-motion"; // Import framer-motion for animations
import NavBar from "./Navbar";

function ProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    emergencyContact: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Check if form data is already saved in localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
      setIsFormSubmitted(true); // Show the profile if data exists
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save data to localStorage
    localStorage.setItem("profileData", JSON.stringify(formData));
    setIsFormSubmitted(true);
  };

  const handleEdit = () => {
    setIsFormSubmitted(false); // Allow editing the form
  };

  return (
    <div>
    <div>
        <NavBar />
    </div>
    <div className="min-h-screen bg-gradient-to-b from-pink-400 via-rose-300 to-blue-200 flex flex-col items-center justify-center p-6 text-white">
      <motion.h1
        className="text-4xl font-extrabold mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Profile
      </motion.h1>

      {isFormSubmitted ? (
        // Display Profile Information
        <motion.div
          className="w-full max-w-md bg-white text-rose-900 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Your Information</h2>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <FaUser className="text-rose-500 w-6 h-6 mr-4" />
              <p className="font-medium text-lg">{formData.name}</p>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-rose-500 w-6 h-6 mr-4" />
              <p className="font-medium text-lg">{formData.email}</p>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-rose-500 w-6 h-6 mr-4" />
              <p className="font-medium text-lg">{formData.phone}</p>
            </div>
            <div className="flex items-center">
              <FaHome className="text-rose-500 w-6 h-6 mr-4" />
              <p className="font-medium text-lg">{formData.address}</p>
            </div>
            <div className="flex items-center">
              <FaHeartbeat className="text-rose-500 w-6 h-6 mr-4" />
              <p className="font-medium text-lg">{formData.emergencyContact}</p>
            </div>
          </div>
          <button
            className="mt-6 w-full bg-rose-500 hover:bg-rose-600 text-white py-2 px-6 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            onClick={handleEdit}
          >
            <FaEdit className="mr-2" /> Edit Information
          </button>
        </motion.div>
      ) : (
        // Display Form to Fill Information
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white text-rose-900 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Fill Your Information</h2>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-1"
              htmlFor="emergencyContact"
            >
              Emergency Contact
            </label>
            <input
              type="text"
              id="emergencyContact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 px-6 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Save Information
          </button>
        </motion.form>
      )}
    </div>
    </div>
  );
}

export default ProfilePage;