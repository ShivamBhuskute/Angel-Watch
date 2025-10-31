import React, { useState, useRef } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import alarmSound from '../assets/alarm-sound.mp3';

const AlertBell = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // Reference for the audio instance
  const db = getFirestore();
  const functions = getFunctions();

  const handleAlert = async () => {
    // Play alert sound
    if (!isPlaying) {
      try {
        audioRef.current = new Audio(alarmSound);
        await audioRef.current.play();
        setIsPlaying(true);

        // Reset when audio ends
        audioRef.current.onended = () => setIsPlaying(false);
      } catch (error) {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      }
    } else {
      // Stop the alert sound if it's already playing
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }

    // Trigger the Firebase Cloud Function
    try {
      const triggerAlert = httpsCallable(functions, 'triggerAlert');
      await triggerAlert({ userId: 'exampleUserId123' });
      console.log('Alert triggered successfully in the background.');
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Alert Bell</h2>
      <button
        onClick={handleAlert}
        className={`px-4 py-2 rounded-lg w-full font-semibold text-white ${
          isPlaying ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        {isPlaying ? 'Stop Alert Bell' : 'Activate Alert Bell'}
      </button>
    </div>
  );
};

export default AlertBell;

// import React, { useState } from "react";

// const AlertBell = () => {
//   const [isAlert, setIsAlert] = useState(false);

//   const handleBellClick = () => {
//     setIsAlert(true);
//     // Add your alert logic here, e.g., sending a notification or triggering an action
//     console.log("Alert triggered!");
//   };

//   return (
//     <button
//       onClick={handleBellClick}
//       className={`relative p-2 rounded-full ${
//         isAlert ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
//       } hover:bg-red-600 transition duration-200`}
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-6 w-6"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth={2}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m1 0v1a3 3 0 006 0v-1m-6 0h6"
//         />
//       </svg>
//       {isAlert && (
//         <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
//       )}
//     </button>
//   );
// };

// export default AlertBell;