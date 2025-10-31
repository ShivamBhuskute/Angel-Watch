



// import { useState, useEffect } from "react";
// import { MapPin, Phone } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Map, { Marker, Popup } from "react-map-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import SidebarWithNavbar from "./SidebarWithNavbar";

// const MAPBOX_TOKEN =
//   "pk.eyJ1IjoidGVqYXMxOTM2IiwiYSI6ImNtNXk1b3p6aTBmN3oycW45anIxeGIyeGYifQ.g8zrtImUGHjJyyp0vn1fmA"; // Replace with your Mapbox token
// const TELEGRAM_BOT_TOKEN =
//   "7885100490:AAH_dz4DXJBQhZyQo2VfpoEfhjK5sMwLBEk"; // Your Telegram bot token
// const TELEGRAM_CHAT_ID = "7329742224"; // Your Telegram chat ID
// const DISCORD_WEBHOOK_URL =
//   "https://discord.com/api/webhooks/1329138480764424294/ApXOIfyGBzZHmTwWjMJ5AVXh6C-VCOO6B51wenQq42J-S-mjjMMC8YhMnB0lpBE-U5WB"; // Your Discord webhook URL

// export default function Home() {
//   const [currentLocation, setCurrentLocation] = useState({
//     latitude: 20.5937, // Default to India's center
//     longitude: 78.9629,
//   });
//   const [locationReady, setLocationReady] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [videoBlob, setVideoBlob] = useState(null);
//   const navigate = useNavigate();
//   let mediaRecorder;
//   let videoChunks = [];
//   let recordingInterval;
//   let locationInterval;
//   let videoSendInterval;
//   let mediaStream;
//   let powerButtonPressCount = 0;
//   let shakeThreshold = 20; // Adjust this value based on the intensity of the shake

//   const handleLocationSharingClick = () => {
//     navigate("/locationSharing");
//   };

//   const handleHelplineButtonClick = () => {
//     navigate("/helpline");
//   };

//   const sendLocationToTelegram = async () => {
//     const mapsLink = `https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}`;
//     const message = `📍 **Live Location Update!**\nLatitude: ${currentLocation.latitude}\nLongitude: ${currentLocation.longitude}\n[View on Maps](${mapsLink})`;

//     const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

//     try {
//       const response = await fetch(telegramApiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           chat_id: TELEGRAM_CHAT_ID,
//           text: message,
//           parse_mode: "Markdown",
//         }),
//       });

//       if (response.ok) {
//         console.log("Location sent to Telegram successfully!");
//       } else {
//         console.error("Failed to send location to Telegram");
//       }
//     } catch (error) {
//       console.error("Error sending location to Telegram:", error);
//     }
//   };

//   const sendVideoToTelegram = async (blob) => {
//     const formData = new FormData();
//     formData.append("chat_id", TELEGRAM_CHAT_ID);
//     formData.append("video", blob, "video.webm");

//     const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendVideo`;

//     try {
//       const response = await fetch(telegramApiUrl, {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         console.log("Video sent to Telegram successfully!");
//       } else {
//         console.error("Failed to send video to Telegram");
//       }
//     } catch (error) {
//       console.error("Error sending video to Telegram:", error);
//     }
//   };

//   const sendLocationToDiscord = async () => {
//     const mapsLink = `https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}`;
//     const message = {
//       content: `📍 **Live Location Update!**\nLatitude: ${currentLocation.latitude}\nLongitude: ${currentLocation.longitude}\n[View on Maps](${mapsLink})`,
//     };

//     try {
//       const response = await fetch(DISCORD_WEBHOOK_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(message),
//       });

//       if (response.ok) {
//         console.log("Location sent to Discord successfully!");
//       } else {
//         console.error("Failed to send location to Discord");
//       }
//     } catch (error) {
//       console.error("Error sending location to Discord:", error);
//     }
//   };

//   const startRecording = async () => {
//     try {
//       mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
//       mediaRecorder = new MediaRecorder(mediaStream);
//       mediaRecorder.ondataavailable = (event) => {
//         videoChunks.push(event.data);
//       };

//       mediaRecorder.onstop = async () => {
//         const blob = new Blob(videoChunks, { type: "video/webm" });
//         setVideoBlob(blob);
//         videoChunks = [];
//         sendVideoToTelegram(blob); // Send video to Telegram
//       };

//       mediaRecorder.start();
//       setIsRecording(true);

//       // Record for 10 seconds and send the video to Telegram
//       videoSendInterval = setInterval(() => {
//         if (mediaRecorder.state === "recording") {
//           mediaRecorder.stop();
//           mediaRecorder.start();
//         }
//       }, 10000); // Stop and start recording every 10 seconds

//       // Share location every 10 seconds while recording
//       locationInterval = setInterval(() => {
//         sendLocationToTelegram();
//       }, 10000); // Share location every 10 seconds
//     } catch (error) {
//       console.error("Error starting recording:", error);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder && mediaRecorder.state === "recording") {
//       clearInterval(recordingInterval); // Stop the recording interval
//       clearInterval(locationInterval); // Stop location sharing interval
//       clearInterval(videoSendInterval); // Stop video sending interval
//       mediaRecorder.stop();
//       setIsRecording(false); // Set the button back to SOS
//       mediaStream.getTracks().forEach((track) => track.stop()); // Stop the camera stream
//     }
//   };

//   const handleSOSButtonClick = async () => {
//     if (isRecording) {
//       // Stop recording and stop location sharing
//       stopRecording();
//     } else {
//       // Start recording and start sharing location
//       startRecording();
//       await sendLocationToTelegram(); // Send initial location to Telegram
//       await sendLocationToDiscord(); // Send initial location to Discord
//     }
//   };

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCurrentLocation({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });
//           setLocationReady(true);
//         },
//         (error) => {
//           console.error("Error getting location: ", error);
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

// // Power button detection simulation
// const handlePowerButtonPress = () => {
//   powerButtonPressCount += 1;
//   if (powerButtonPressCount >= 3) {
//     handleSOSButtonClick();
//     powerButtonPressCount = 0; // Reset after triggering SOS
//   }
// };

// // Detect shaking of the device
// useEffect(() => {
//   const handleShake = (event) => {
//     const acceleration = event.accelerationIncludingGravity;
//     const totalAcceleration = Math.sqrt(
//       acceleration.x * acceleration.x +
//         acceleration.y * acceleration.y +
//         acceleration.z * acceleration.z
//     );

//     if (totalAcceleration > shakeThreshold) {
//       handleSOSButtonClick();
//     }
//   };

//   window.addEventListener("devicemotion", handleShake);

//   return () => {
//     window.removeEventListener("devicemotion", handleShake);
//   };
// }, []);

//   useEffect(() => {
//     getCurrentLocation(); // Get the user's current location when the component mounts
//   }, []);

//   return (
//     <div className="relative min-h-screen bg-gray-200">
//       <SidebarWithNavbar />

//       <div className="mt-16 px-4 md:px-8 flex-grow">
//         <div className="w-full mb-4">
//           <Map
//             initialViewState={{
//               latitude: currentLocation.latitude,
//               longitude: currentLocation.longitude,
//               zoom: 13,
//             }}
//             style={{ width: "100%", height: "60vh" }}
//             mapStyle="mapbox://styles/mapbox/streets-v11"
//             mapboxAccessToken={MAPBOX_TOKEN}
//           >
//             {locationReady && (
//               <>
//                 <Marker
//                   latitude={currentLocation.latitude}
//                   longitude={currentLocation.longitude}
//                   anchor="bottom"
//                 >
//                   <MapPin className="text-red-500 w-6 h-6" />
//                 </Marker>
//                 <Popup
//                   latitude={currentLocation.latitude}
//                   longitude={currentLocation.longitude}
//                   closeOnClick={false}
//                   closeButton={true}
//                   anchor="top"
//                 >
//                   <div>Your current location</div>
//                 </Popup>
//               </>
//             )}
//           </Map>
//         </div>

//         <div className="w-full flex justify-between items-center p-4 bg-transparent fixed bottom-0 left-0 md:left-1/2 transform md:-translate-x-1/2 z-50">
//           <div className="flex flex-col items-center">
//             <div
//               className="flex justify-center items-center bg-white shadow-md rounded-full w-14 h-14 cursor-pointer"
//               onClick={handleLocationSharingClick}
//             >
//               <MapPin className="w-6 h-6 text-gray-700" />
//             </div>
//             <span className="text-xs text-gray-600 mt-2">Share Location</span>
//           </div>

//           <div className="flex justify-center items-center">
//             <button
//               className={`bg-red-600 text-white font-bold text-sm px-6 py-6 rounded-full shadow-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-300 ${
//                 isRecording ? "bg-red-800" : ""
//               }`}
//               aria-label="SOS Button"
//               onClick={handleSOSButtonClick}
//             >
//               {isRecording ? "Stop Recording" : "SOS"}
//             </button>
//           </div>

//           <div className="flex flex-col items-center">
//             <div
//               onClick={handleHelplineButtonClick}
//               className="flex justify-center items-center bg-white shadow-md rounded-full w-14 h-14 cursor-pointer"
//             >
//               <Phone className="w-6 h-6 text-gray-700" />
//             </div>
//             <span className="text-xs text-gray-600 mt-2">Helpline</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { useState, useEffect, useRef } from "react";
// import { MapPin, Phone } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Map, { Marker, Popup } from "react-map-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import SidebarWithNavbar from "./SidebarWithNavbar";
// import AlertBell from "./IAlertBell";
// import {
//   MapPin as MapPinIcon, // Rename the icon import to avoid conflicts
//   BellAlertIcon as BellIcon,
//   ChatBubbleOvalLeftIcon as ChatIcon,
//   PhoneIcon,
// } from "@heroicons/react/24/outline";



// const MAPBOX_TOKEN =
//   "pk.eyJ1IjoidGVqYXMxOTM2IiwiYSI6ImNtNXk1b3p6aTBmN3oycW45anIxeGIyeGYifQ.g8zrtImUGHjJyyp0vn1fmA"; // Replace with your Mapbox token
// const TELEGRAM_BOT_TOKEN =
//   "7885100490:AAH_dz4DXJBQhZyQo2VfpoEfhjK5sMwLBEk"; // Your Telegram bot token
// const TELEGRAM_CHAT_ID = "7329742224"; // Your Telegram chat ID
// const DISCORD_WEBHOOK_URL =
//   "https://discord.com/api/webhooks/1329138480764424294/ApXOIfyGBzZHmTwWjMJ5AVXh6C-VCOO6B51wenQq42J-S-mjjMMC8YhMnB0lpBE-U5WB"; // Your Discord webhook URL

// export default function Home() {
//   const [currentLocation, setCurrentLocation] = useState({
//     latitude: 19.0656, // Latitude of Angel Polytechnic College, Vashi
//     longitude: 73.0169, // Longitude of Angel Polytechnic College, Vashi
//   });
//   const [locationReady, setLocationReady] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [videoBlob, setVideoBlob] = useState(null);
//   const navigate = useNavigate();
//   let mediaRecorder;
//   let videoChunks = [];
//   let recordingInterval;
//   let locationInterval;
//   let videoSendInterval;
//   let mediaStream;
//   let powerButtonPressCount = 0;
//   let shakeThreshold = 20; // Adjust this value based on the intensity of the shake

//   const lastClickTime = useRef(0); // Track the last click time
//   const doubleClickThreshold = 300; // Time limit (in milliseconds) for double-clic

//   const handleLocationSharingClick = () => {
//     navigate("/locationSharing");
//   };

//   const handleHelplineButtonClick = () => {
//     navigate("/helpline");
//   };

//   const sendLocationToTelegram = async () => {
//     const mapsLink = `https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}`;
//     const message = `📍 **Live Location Update!**\nLatitude: ${currentLocation.latitude}\nLongitude: ${currentLocation.longitude}\n[View on Maps](${mapsLink})`;

//     const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

//     try {
//       const response = await fetch(telegramApiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           chat_id: TELEGRAM_CHAT_ID,
//           text: message,
//           parse_mode: "Markdown",
//         }),
//       });

//       if (response.ok) {
//         console.log("Location sent to Telegram successfully!");
//       } else {
//         console.error("Failed to send location to Telegram");
//       }
//     } catch (error) {
//       console.error("Error sending location to Telegram:", error);
//     }
//   };

//   const sendVideoToTelegram = async (blob) => {
//     const formData = new FormData();
//     formData.append("chat_id", TELEGRAM_CHAT_ID);
//     formData.append("video", blob, "video.webm");

//     const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendVideo`;

//     try {
//       const response = await fetch(telegramApiUrl, {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         console.log("Video sent to Telegram successfully!");
//       } else {
//         console.error("Failed to send video to Telegram");
//       }
//     } catch (error) {
//       console.error("Error sending video to Telegram:", error);
//     }
//   };

//   const sendLocationToDiscord = async () => {
//     const mapsLink = `https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}`;
//     const message = {
//       content: `📍 **Live Location Update!**\nLatitude: ${currentLocation.latitude}\nLongitude: ${currentLocation.longitude}\n[View on Maps](${mapsLink})`,
//     };

//     try {
//       const response = await fetch(DISCORD_WEBHOOK_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(message),
//       });

//       if (response.ok) {
//         console.log("Location sent to Discord successfully!");
//       } else {
//         console.error("Failed to send location to Discord");
//       }
//     } catch (error) {
//       console.error("Error sending location to Discord:", error);
//     }
//   };

//   const startRecording = async () => {
//     try {
//       mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
//       mediaRecorder = new MediaRecorder(mediaStream);
//       mediaRecorder.ondataavailable = (event) => {
//         videoChunks.push(event.data);
//       };

//       mediaRecorder.onstop = async () => {
//         const blob = new Blob(videoChunks, { type: "video/webm" });
//         setVideoBlob(blob);
//         videoChunks = [];
//         sendVideoToTelegram(blob); // Send video to Telegram
//       };

//       mediaRecorder.start();
//       setIsRecording(true);

//       // Record for 10 seconds and send the video to Telegram
//       videoSendInterval = setInterval(() => {
//         if (mediaRecorder.state === "recording") {
//           mediaRecorder.stop();
//           mediaRecorder.start();
//         }
//       }, 10000); // Stop and start recording every 10 seconds

//       // Share location every 10 seconds while recording
//       locationInterval = setInterval(() => {
//         sendLocationToTelegram();
//       }, 10000); // Share location every 10 seconds
//     } catch (error) {
//       console.error("Error starting recording:", error);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder && mediaRecorder.state === "recording") {
//       clearInterval(recordingInterval); // Stop the recording interval
//       clearInterval(locationInterval); // Stop location sharing interval
//       clearInterval(videoSendInterval); // Stop video sending interval
//       mediaRecorder.stop();
//       setIsRecording(false); // Set the button back to SOS
//       mediaStream.getTracks().forEach((track) => track.stop()); // Stop the camera stream
//     }
//   };

//   // const handleSOSButtonClick = async () => {
//   //   if (isRecording) {
//   //     // Stop recording and stop location sharing
//   //     stopRecording();
//   //   } else {
//   //     // Start recording and start sharing location
//   //     startRecording();
//   //     await sendLocationToTelegram(); // Send initial location to Telegram
//   //     await sendLocationToDiscord(); // Send initial location to Discord
//   //   }
//   // };

//   const handleSOSButtonClick = async () => {
//     const currentTime = Date.now();
//     const timeDifference = currentTime - lastClickTime.current;

//     // Check if the time difference between clicks is small enough to be considered a double-click
//     if (timeDifference < doubleClickThreshold) {
//       console.log("Button double-clicked!");

//       if (isRecording) {
//         console.log("Stopping recording...");
//         // Stop recording and stop location sharing
//         stopRecording();
//       } else {
//         console.log("Starting recording...");
//         // Start recording and start sharing location
//         startRecording();
//         await sendLocationToTelegram(); // Send initial location to Telegram
//         await sendLocationToDiscord(); // Send initial location to Discord
//       }

//       // Toggle the isRecording state
//       setIsRecording(!isRecording);
//     }

//     // Update lastClickTime to the current time
//     lastClickTime.current = currentTime;
//   };



//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCurrentLocation({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });
//           setLocationReady(true);
//         },
//         (error) => {
//           console.error("Error getting location: ", error);
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   const handleAlertBellClick = () => {
//     alert("Alert Bell triggered!");
//     // Add custom functionality here (e.g., sound alarm, notify authorities, etc.)
//   };

//   // Power button detection simulation
//   const handlePowerButtonPress = () => {
//     powerButtonPressCount += 1;
//     if (powerButtonPressCount >= 3) {
//       handleSOSButtonClick();
//       powerButtonPressCount = 0; // Reset after triggering SOS
//     }
//   };

//   // Detect shaking of the device
//   useEffect(() => {
//     const handleShake = (event) => {
//       const acceleration = event.accelerationIncludingGravity;
//       const totalAcceleration = Math.sqrt(
//         acceleration.x * acceleration.x +
//         acceleration.y * acceleration.y +
//         acceleration.z * acceleration.z
//       );

//       if (totalAcceleration > shakeThreshold) {
//         handleSOSButtonClick();
//       }
//     };

//     window.addEventListener("devicemotion", handleShake);

//     return () => {
//       window.removeEventListener("devicemotion", handleShake);
//     };
//   }, []);

//   useEffect(() => {
//     getCurrentLocation(); // Get the user's current location when the component mounts
//   }, []);


//   function HomeMain() {
//     return (
//       <div className="relative min-h-screen bg-gray-200">
//         <SidebarWithNavbar />

//         <div className="mt-16 px-4 md:px-8 flex-grow">
//           <div className="w-full mb-4">
//             <Map
//               initialViewState={{
//                 latitude: currentLocation.latitude,
//                 longitude: currentLocation.longitude,
//                 zoom: 13,
//               }}
//               style={{ width: "100%", height: "100vh" }}
//               mapStyle="mapbox://styles/mapbox/streets-v11"
//               mapboxAccessToken={MAPBOX_TOKEN}
//             >
//               {locationReady && (
//                 <>
//                   <Marker
//                     latitude={currentLocation.latitude}
//                     longitude={currentLocation.longitude}
//                     anchor="bottom"
//                   >
//                     <MapPin className="text-red-500 w-6 h-6" />
//                   </Marker>
//                   <Popup
//                     latitude={currentLocation.latitude}
//                     longitude={currentLocation.longitude}
//                     closeOnClick={false}
//                     closeButton={true}
//                     anchor="top"
//                   >
//                     <div>Your current location</div>
//                   </Popup>
//                 </>
//               )}
//             </Map>
//           </div>

//           {/* Bottom Fixed Section */}
//           <div className="bg-white shadow-lg rounded-t-lg p-4 fixed bottom-0 left-0 right-0 z-50">
//             <div className="flex justify-between items-center">
//               {/* Share Location */}
//               <div className="flex flex-col items-center">
//                 <div
//                   className="flex justify-center items-center bg-blue-600 text-white shadow-md rounded-full w-14 h-14 cursor-pointer"
//                   onClick={handleLocationSharingClick}
//                 >
//                   <MapPinIcon className="w-6 h-6" />
//                 </div>
//                 <span className="text-xs text-gray-600 mt-2">Share Location</span>
//               </div>

//               {/* Alert Bell */}
//               <div className="flex flex-col items-center">
//                 <div
//                   onClick={handleAlertBellClick}
//                   className="flex justify-center items-center bg-blue-600 text-white shadow-md rounded-full w-14 h-14 cursor-pointer"
//                 >
//                   <BellIcon className="w-6 h-6" />
//                 </div>
//                 <span className="text-xs text-gray-600 mt-2">Alert</span>
//               </div>

//               {/* SOS Button */}
//               <button
//                 className={`bg-red-600 text-white font-bold text-sm px-6 py-6 rounded-full shadow-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-300 ${
//                   isRecording ? "bg-red-800" : ""
//                 }`}
//                 aria-label="SOS Button"
//                 onClick={handleSOSButtonClick}
//               >
//                 {isRecording ? "Stop Recording" : "SOS"}
//               </button>

//               {/* Chatbot */}
//               <div className="flex flex-col items-center">
//                 <div className="flex justify-center items-center bg-blue-600 text-white shadow-md rounded-full w-14 h-14 cursor-pointer">
//                   <ChatIcon className="w-6 h-6" />
//                 </div>
//                 <span className="text-xs text-gray-600 mt-2">Chatbot</span>
//               </div>

//               {/* Helpline */}
//               <div className="flex flex-col items-center">
//                 <div
//                   onClick={handleHelplineButtonClick}
//                   className="flex justify-center items-center bg-blue-600 text-white shadow-md rounded-full w-14 h-14 cursor-pointer"
//                 >
//                   <PhoneIcon className="w-6 h-6" />
//                 </div>
//                 <span className="text-xs text-gray-600 mt-2">Helpline</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }


// import { useState, useEffect, useRef } from "react";
// import { MapPin, Phone } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Map, { Marker, Popup } from "react-map-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import SidebarWithNavbar from "./SidebarWithNavbar";

// const MAPBOX_TOKEN =
//   "pk.eyJ1IjoidGVqYXMxOTM2IiwiYSI6ImNtNXk1b3p6aTBmN3oycW45anIxeGIyeGYifQ.g8zrtImUGHjJyyp0vn1fmA"; // Replace with your Mapbox token
// const TELEGRAM_BOT_TOKEN =
//   "YOUR_TELEGRAM_BOT_TOKEN"; // Replace with your Telegram bot token
// const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID"; // Replace with your Telegram chat ID
// const DISCORD_WEBHOOK_URL =
//   "YOUR_DISCORD_WEBHOOK_URL"; // Replace with your Discord webhook URL

//   export default function Home() {
//     const [currentLocation, setCurrentLocation] = useState({
//       latitude: 19.0656, // Latitude of Angel Polytechnic College, Vashi
//       longitude: 73.0169, // Longitude of Angel Polytechnic College, Vashi
//     });
//   const [locationReady, setLocationReady] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [videoBlob, setVideoBlob] = useState(null);
//   const navigate = useNavigate();

//   let mediaRecorder = null;
//   let videoChunks = [];
//   let mediaStream = null;

//   const handleLocationSharingClick = () => {
//     navigate("/locationSharing");
//   };

//   const handleHelplineButtonClick = () => {
//     navigate("/helpline");
//   };

//   const sendLocationToTelegram = async () => {
//     const mapsLink = `https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}`;
//     const message = `📍 **Live Location Update!**\nLatitude: ${currentLocation.latitude}\nLongitude: ${currentLocation.longitude}\n[View on Maps](${mapsLink})`;

//     const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

//     try {
//       const response = await fetch(telegramApiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           chat_id: TELEGRAM_CHAT_ID,
//           text: message,
//           parse_mode: "Markdown",
//         }),
//       });

//       if (response.ok) {
//         console.log("Location sent to Telegram successfully!");
//       } else {
//         console.error("Failed to send location to Telegram");
//       }
//     } catch (error) {
//       console.error("Error sending location to Telegram:", error);
//     }
//   };

//   const sendVideoToTelegram = async (blob) => {
//     const formData = new FormData();
//     formData.append("chat_id", TELEGRAM_CHAT_ID);
//     formData.append("video", blob, "video.webm");

//     const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendVideo`;

//     try {
//       const response = await fetch(telegramApiUrl, {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         console.log("Video sent to Telegram successfully!");
//       } else {
//         console.error("Failed to send video to Telegram");
//       }
//     } catch (error) {
//       console.error("Error sending video to Telegram:", error);
//     }
//   };

//   const startRecording = async () => {
//     try {
//       mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
//       console.log("Camera access granted!");

//       mediaRecorder = new MediaRecorder(mediaStream);
//       videoChunks = [];

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           videoChunks.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = async () => {
//         const blob = new Blob(videoChunks, { type: "video/webm" });
//         setVideoBlob(blob);
//         await sendVideoToTelegram(blob);
//       };

//       mediaRecorder.start();
//       setIsRecording(true);
//       console.log("Recording started!");
//     } catch (error) {
//       console.error("Error starting recording:", error.message);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder && mediaRecorder.state === "recording") {
//       mediaRecorder.stop();
//       setIsRecording(false);
//       console.log("Recording stopped.");
//       mediaStream.getTracks().forEach((track) => track.stop());
//     }
//   };

//   const lastClickTime = useRef(0); // Track the last click time
//   const doubleClickThreshold = 300; // Time limit (in milliseconds) for double-click detection

//   const handleClick = async () => {
//     const currentTime = Date.now();
//     const timeDifference = currentTime - lastClickTime.current;

//     // Check if the time difference between clicks is small enough to be considered a double-click
//     if (timeDifference < doubleClickThreshold) {
//       console.log("Button double-clicked!");

//       if (isRecording) {
//         console.log("Stopping recording...");
//         // Stop recording and stop location sharing
//         stopRecording();
//       } else {
//         console.log("Starting recording...");
//         // Start recording and start sharing location
//         startRecording();
//         await sendLocationToTelegram(); // Send initial location to Telegram
//         await sendLocationToDiscord(); // Send initial location to Discord
//       }

//       // Toggle the isRecording state
//       setIsRecording(!isRecording);
//     }

//     // Update lastClickTime to the current time
//     lastClickTime.current = currentTime;
//   };

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCurrentLocation({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });
//           setLocationReady(true);
//         },
//         (error) => {
//           console.error("Error getting location: ", error.message);
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   useEffect(() => {
//     getCurrentLocation();
//   }, []);

//   return (
//     <div className="relative min-h-screen bg-gray-200">
//       <SidebarWithNavbar />
//       <div className="mt-16 px-4 md:px-8 flex-grow">
//         <div className="w-full mb-4">
//           <Map
//             initialViewState={{
//               latitude: currentLocation.latitude,
//               longitude: currentLocation.longitude,
//               zoom: 13,
//             }}
//             style={{ width: "100%", height: "60vh" }}
//             mapStyle="mapbox://styles/mapbox/streets-v11"
//             mapboxAccessToken={MAPBOX_TOKEN}
//           >
//             {locationReady && (
//               <>
//                 <Marker
//                   latitude={currentLocation.latitude}
//                   longitude={currentLocation.longitude}
//                   anchor="bottom"
//                 >
//                   <MapPin className="text-red-500 w-6 h-6" />
//                 </Marker>
//                 <Popup
//                   latitude={currentLocation.latitude}
//                   longitude={currentLocation.longitude}
//                   closeOnClick={false}
//                   closeButton={true}
//                   anchor="top"
//                 >
//                   <div>Your current location</div>
//                 </Popup>
//               </>
//             )}
//           </Map>
//         </div>
//         <div className="bg-white shadow-lg rounded-t-lg p-4 fixed bottom-0 left-0 right-0 z-50">
//           <div className="flex justify-between items-center">
//             <div
//               className="bg-blue-600 text-white p-4 rounded-full cursor-pointer"
//               onClick={handleLocationSharingClick}
//             >
//               <MapPin />
//             </div>
//             <button
//               onClick={handleSOSButtonClick}
//               className={`bg-red-600 text-white px-6 py-3 rounded-full ${
//                 isRecording ? "bg-red-800" : ""
//               }`}
//             >
//               {isRecording ? "Stop Recording" : "SOS"}
//             </button>
//             <div
//               className="bg-blue-600 text-white p-4 rounded-full cursor-pointer"
//               onClick={handleHelplineButtonClick}
//             >
//               <Phone />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// import { useState, useEffect, useRef } from "react";
// import { MapPin, Phone } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Map, { Marker, Popup } from "react-map-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import SidebarWithNavbar from "./SidebarWithNavbar";

// const MAPBOX_TOKEN =
//   "pk.eyJ1IjoidGVqYXMxOTM2IiwiYSI6ImNtNXk1b3p6aTBmN3oycW45anIxeGIyeGYifQ.g8zrtImUGHjJyyp0vn1fmA"; // Replace with your Mapbox token
// const TELEGRAM_BOT_TOKEN =
//   "YOUR_TELEGRAM_BOT_TOKEN"; // Replace with your Telegram bot token
// const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID"; // Replace with your Telegram chat ID
// const DISCORD_WEBHOOK_URL =
//   "YOUR_DISCORD_WEBHOOK_URL"; // Replace with your Discord webhook URL

// export default function Home() {

//   const lastClickTime = useRef(0); // Track the last click time
//   const doubleClickThreshold = 300; // Time limit (in milliseconds) for double-click detection

//   const handleSOSButtonClick = async () => {
//     const currentTime = Date.now();
//     const timeDifference = currentTime - lastClickTime.current;

//     // Check if the time difference between clicks is small enough to be considered a double-click
//     if (timeDifference < doubleClickThreshold) {
//       console.log("Button double-clicked!");

//       if (isRecording) {
//         console.log("Stopping recording...");
//         // Stop recording and stop location sharing
//         stopRecording();
//       } else {
//         console.log("Starting recording...");
//         // Start recording and start sharing location
//         startRecording();
//         await sendLocationToTelegram(); // Send initial location to Telegram
//         await sendLocationToDiscord(); // Send initial location to Discord
//       }

//       // Toggle the isRecording state
//       setIsRecording(!isRecording);
//     }

//     // Update lastClickTime to the current time
//     lastClickTime.current = currentTime;
//   };

//   const [currentLocation, setCurrentLocation] = useState({
//     latitude: 20.5937, // Default to India's center
//     longitude: 78.9629,
//   });
//   const [locationReady, setLocationReady] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [videoBlob, setVideoBlob] = useState(null);
//   const navigate = useNavigate();

//   let mediaRecorder = null;
//   let videoChunks = [];
//   let mediaStream = null;

//   const handleLocationSharingClick = () => {
//     navigate("/locationSharing");
//   };

//   const handleHelplineButtonClick = () => {
//     navigate("/helpline");
//   };

//   const sendLocationToTelegram = async () => {
//     const mapsLink = `https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}`;
//     const message = `📍 **Live Location Update!**\nLatitude: ${currentLocation.latitude}\nLongitude: ${currentLocation.longitude}\n[View on Maps](${mapsLink})`;

//     const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

//     try {
//       const response = await fetch(telegramApiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           chat_id: TELEGRAM_CHAT_ID,
//           text: message,
//           parse_mode: "Markdown",
//         }),
//       });

//       if (response.ok) {
//         console.log("Location sent to Telegram successfully!");
//       } else {
//         console.error("Failed to send location to Telegram");
//       }
//     } catch (error) {
//       console.error("Error sending location to Telegram:", error);
//     }
//   };

//   const sendVideoToTelegram = async (blob) => {
//     const formData = new FormData();
//     formData.append("chat_id", TELEGRAM_CHAT_ID);
//     formData.append("video", blob, "video.webm");

//     const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendVideo`;

//     try {
//       const response = await fetch(telegramApiUrl, {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         console.log("Video sent to Telegram successfully!");
//       } else {
//         console.error("Failed to send video to Telegram");
//       }
//     } catch (error) {
//       console.error("Error sending video to Telegram:", error);
//     }
//   };

//   const startRecording = async () => {
//     try {
//       mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
//       console.log("Camera access granted!");

//       mediaRecorder = new MediaRecorder(mediaStream);
//       videoChunks = [];

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           videoChunks.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = async () => {
//         const blob = new Blob(videoChunks, { type: "video/webm" });
//         setVideoBlob(blob);
//         await sendVideoToTelegram(blob);
//       };

//       mediaRecorder.start();
//       setIsRecording(true);
//       console.log("Recording started!");
//     } catch (error) {
//       console.error("Error starting recording:", error.message);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder && mediaRecorder.state === "recording") {
//       mediaRecorder.stop();
//       setIsRecording(false);
//       console.log("Recording stopped.");
//       mediaStream.getTracks().forEach((track) => track.stop());
//     }
//   };

//   // const handleSOSButtonClick = async () => {
//   //   if (isRecording) {
//   //     stopRecording();
//   //   } else {
//   //     startRecording();
//   //     await sendLocationToTelegram();
//   //   }
//   // };


//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCurrentLocation({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });
//           setLocationReady(true);
//         },
//         (error) => {
//           console.error("Error getting location: ", error.message);
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   useEffect(() => {
//     getCurrentLocation();
//   }, []);

//   return (
//     <div className="relative min-h-screen bg-gray-200">
//       <SidebarWithNavbar />
//       <div className="mt-16 px-4 md:px-8 flex-grow">
//         <div className="w-full mb-4">
//           <Map
//             initialViewState={{
//               latitude: currentLocation.latitude,
//               longitude: currentLocation.longitude,
//               zoom: 13,
//             }}
//             style={{ width: "100%", height: "60vh" }}
//             mapStyle="mapbox://styles/mapbox/streets-v11"
//             mapboxAccessToken={MAPBOX_TOKEN}
//           >
//             {locationReady && (
//               <>
//                 <Marker
//                   latitude={currentLocation.latitude}
//                   longitude={currentLocation.longitude}
//                   anchor="bottom"
//                 >
//                   <MapPin className="text-red-500 w-6 h-6" />
//                 </Marker>
//                 <Popup
//                   latitude={currentLocation.latitude}
//                   longitude={currentLocation.longitude}
//                   closeOnClick={false}
//                   closeButton={true}
//                   anchor="top"
//                 >
//                   <div>Your current location</div>
//                 </Popup>
//               </>
//             )}
//           </Map>
//         </div>
//         <div className="bg-white shadow-lg rounded-t-lg p-4 fixed bottom-0 left-0 right-0 z-50">
//           <div className="flex justify-between items-center">
//             <div
//               className="bg-blue-600 text-white p-4 rounded-full cursor-pointer"
//               onClick={handleLocationSharingClick}
//             >
//               <MapPin />
//             </div>
//             <button
//               onClick={handleSOSButtonClick}
//               className={`bg-red-600 text-white px-6 py-3 rounded-full ${
//                 isRecording ? "bg-red-800" : ""
//               }`}
//             >
//               {isRecording ? "Stop Recording" : "SOS"}
//             </button>
//             <div
//               className="bg-blue-600 text-white p-4 rounded-full cursor-pointer"
//               onClick={handleHelplineButtonClick}
//             >
//               <Phone />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }









// // main code 
// import { useState, useEffect, useRef } from "react";
// import { MapPin, Phone } from "lucide-react";
// import Map, { Marker, Popup } from "react-map-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { useNavigate } from "react-router-dom";
// import SidebarWithNavbar from "./SidebarWithNavbar"
// import TidioChat from "../components/TidioChat";

// const MAPBOX_TOKEN =
//   "pk.eyJ1IjoidGVqYXMxOTM2IiwiYSI6ImNtNXk1b3p6aTBmN3oycW45anIxeGIyeGYifQ.g8zrtImUGHjJyyp0vn1fmA"; // Replace with your Mapbox token
// const TELEGRAM_BOT_TOKEN =
//   "7885100490:AAH_dz4DXJBQhZyQo2VfpoEfhjK5sMwLBEk"; // Your Telegram bot token
// const TELEGRAM_CHAT_ID = "7329742224"; // Your Telegram chat ID
// const DISCORD_WEBHOOK_URL =
//   "https://discord.com/api/webhooks/1329138480764424294/ApXOIfyGBzZHmTwWjMJ5AVXh6C-VCOO6B51wenQq42J-S-mjjMMC8YhMnB0lpBE-U5WB"; // Your Discord webhook URL
// export default function Home() {
//   const lastClickTime = useRef(0); // Track the last click time
//   const doubleClickThreshold = 300; // Time limit (in milliseconds) for double-click detection
//   let shakeThreshold = 20; // Adjust this value based on the intensity of the shake

//   const [currentLocation, setCurrentLocation] = useState({
//     latitude: 20.5937, // Default to India's center
//     longitude: 78.9629,
//   });
//   const [locationReady, setLocationReady] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [videoBlob, setVideoBlob] = useState(null);
//   const navigate = useNavigate();

//   let mediaRecorder = null;
//   let videoChunks = [];
//   let mediaStream = null;

//   const handleLocationSharingClick = () => {
//     navigate("/locationSharing");
//   };

//   const handleHelplineButtonClick = () => {
//     navigate("/helpline");
//   };

//   const sendLocationToTelegram = async () => {
//     const mapsLink = `https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}`;
//     const message = `📍 **Live Location Update!**\nLatitude: ${currentLocation.latitude}\nLongitude: ${currentLocation.longitude}\n[View on Maps](${mapsLink})`;

//     const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

//     try {
//       const response = await fetch(telegramApiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           chat_id: TELEGRAM_CHAT_ID,
//           text: message,
//           parse_mode: "Markdown",
//         }),
//       });

//       if (response.ok) {
//         console.log("Location sent to Telegram successfully!");
//       } else {
//         console.error("Failed to send location to Telegram");
//       }
//     } catch (error) {
//       console.error("Error sending location to Telegram:", error);
//     }
//   };

//   const sendVideoToTelegram = async (blob) => {
//     const formData = new FormData();
//     formData.append("chat_id", TELEGRAM_CHAT_ID);
//     formData.append("video", blob, "video.webm");

//     const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendVideo`;

//     try {
//       const response = await fetch(telegramApiUrl, {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         console.log("Video sent to Telegram successfully!");
//       } else {
//         console.error("Failed to send video to Telegram");
//       }
//     } catch (error) {
//       console.error("Error sending video to Telegram:", error);
//     }
//   };

//   // const startRecording = async () => {
//   //   try {
//   //     mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
//   //     console.log("Camera access granted!");

//   //     mediaRecorder = new MediaRecorder(mediaStream);
//   //     videoChunks = [];

//   //     mediaRecorder.ondataavailable = (event) => {
//   //       if (event.data.size > 0) {
//   //         videoChunks.push(event.data);
//   //       }
//   //     };

//   //     mediaRecorder.onstop = async () => {
//   //       const blob = new Blob(videoChunks, { type: "video/webm" });
//   //       setVideoBlob(blob);
//   //       await sendVideoToTelegram(blob);
//   //     };

//   //     mediaRecorder.start();
//   //     setIsRecording(true);
//   //     console.log("Recording started!");
//   //   } catch (error) {
//   //     console.error("Error starting recording:", error.message);
//   //   }
//   // };

//   // const stopRecording = () => {
//   //   if (mediaRecorder && mediaRecorder.state === "recording") {
//   //     mediaRecorder.stop();
//   //     setIsRecording(false);
//   //     console.log("Recording stopped.");
//   //     mediaStream.getTracks().forEach((track) => track.stop());
//   //   }
//   // };
//   const startRecording = async () => {
//     try {
//       mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
//       mediaRecorder = new MediaRecorder(mediaStream);
//       mediaRecorder.ondataavailable = (event) => {
//         videoChunks.push(event.data);
//       };

//       mediaRecorder.onstop = async () => {
//         const blob = new Blob(videoChunks, { type: "video/webm" });
//         setVideoBlob(blob);
//         videoChunks = [];
//         sendVideoToTelegram(blob); // Send video to Telegram
//       };

//       mediaRecorder.start();
//       setIsRecording(true);

//       // Record for 10 seconds and send the video to Telegram
//       videoSendInterval = setInterval(() => {
//         if (mediaRecorder.state === "recording") {
//           mediaRecorder.stop();
//           mediaRecorder.start();
//         }
//       }, 10000); // Stop and start recording every 10 seconds

//       // Share location every 10 seconds while recording
//       locationInterval = setInterval(() => {
//         sendLocationToTelegram();
//       }, 10000); // Share location every 10 seconds
//     } catch (error) {
//       console.error("Error starting recording:", error);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder && mediaRecorder.state === "recording") {
//       clearInterval(recordingInterval); // Stop the recording interval
//       clearInterval(locationInterval); // Stop location sharing interval
//       clearInterval(videoSendInterval); // Stop video sending interval
//       mediaRecorder.stop();
//       setIsRecording(false); // Set the button back to SOS
//       mediaStream.getTracks().forEach((track) => track.stop()); // Stop the camera stream
//     }
//   };

//   const handleSOSButtonClick = async () => {
//     const currentTime = Date.now();
//     const timeDifference = currentTime - lastClickTime.current;

//     if (timeDifference < doubleClickThreshold) {
//       console.log("Button double-clicked!");

//       if (isRecording) {
//         stopRecording();
//       } else {
//         startRecording();
//         await sendLocationToTelegram();
//       }

//       setIsRecording(!isRecording);
//     }

//     lastClickTime.current = currentTime;
//   };

//   // Power button detection simulation
//   const handlePowerButtonPress = () => {
//     powerButtonPressCount += 1;
//     if (powerButtonPressCount >= 3) {
//       handleSOSButtonClick();
//       powerButtonPressCount = 0; // Reset after triggering SOS
//     }
//   };

//   // Detect shaking of the device
//   useEffect(() => {
//     const handleShake = (event) => {
//       const acceleration = event.accelerationIncludingGravity;
//       const totalAcceleration = Math.sqrt(
//         acceleration.x * acceleration.x +
//         acceleration.y * acceleration.y +
//         acceleration.z * acceleration.z
//       );

//       if (totalAcceleration > shakeThreshold) {
//         handleSOSButtonClick();
//       }
//     };

//     window.addEventListener("devicemotion", handleShake);

//     return () => {
//       window.removeEventListener("devicemotion", handleShake);
//     };
//   }, []);

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCurrentLocation({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });
//           setLocationReady(true);
//         },
//         (error) => {
//           console.error("Error getting location:", error.message);
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   useEffect(() => {
//     getCurrentLocation();
//   }, []);

//   return (
//     <div className="relative min-h-screen bg-gray-200">
//       <SidebarWithNavbar />
//       <div className="mt-16 px-4 md:px-8 flex-grow">
//         <div className="w-full mb-4">
//           <Map
//             initialViewState={{
//               latitude: currentLocation.latitude,
//               longitude: currentLocation.longitude,
//               zoom: 13,
//             }}
//             style={{ width: "100%", height: "100vh" }}
//             mapStyle="mapbox://styles/mapbox/streets-v11"
//             mapboxAccessToken={MAPBOX_TOKEN}
//           >
//             {locationReady && (
//               <>
//                 <Marker
//                   latitude={currentLocation.latitude}
//                   longitude={currentLocation.longitude}
//                   anchor="bottom"
//                 >
//                   <MapPin className="text-red-500 w-6 h-6" />
//                 </Marker>
//                 <Popup
//                   latitude={currentLocation.latitude}
//                   longitude={currentLocation.longitude}
//                   closeOnClick={false}
//                   closeButton={true}
//                   anchor="top"
//                 >
//                   <div>Your current location</div>
//                 </Popup>
//               </>
//             )}
//           </Map>
//         </div>
//         <div className="bg-white shadow-lg rounded-t-lg p-4 fixed bottom-0 left-0 right-0 z-50">
//           <div className="flex justify-between items-center">
//             <div
//               className="bg-blue-600 text-white p-4 rounded-full cursor-pointer"
//               onClick={handleLocationSharingClick}
//             >
//               <MapPin />
//             </div>
//             <button
//               onClick={handleSOSButtonClick}
//               className={`bg-red-600 text-white px-6 py-3 rounded-full ${isRecording ? "bg-red-800" : ""
//                 }`}
//             >
//               {isRecording ? "Stop Recording" : "SOS"}
//             </button>
//             <div
//               className="bg-blue-600 text-white p-4 rounded-full cursor-pointer"
//               onClick={handleHelplineButtonClick}
//             >
//               <Phone />
//             </div>
//           </div>
//         </div>
//         <TidioChat />
//       </div>
//     </div>
//   );
// }



















// main code 
import { useState, useEffect, useRef } from "react";
import { MapPin, Phone } from "lucide-react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useNavigate } from "react-router-dom";
import SidebarWithNavbar from "./SidebarWithNavbar"
import TidioChat from "../components/TidioChat";
import { FaBell } from "react-icons/fa"; // Bell icon from react-icons
import buzzer from "../assets/buzzer.mp3"


const MAPBOX_TOKEN =
  "pk.eyJ1IjoidGVqYXMxOTM2IiwiYSI6ImNtNXk1b3p6aTBmN3oycW45anIxeGIyeGYifQ.g8zrtImUGHjJyyp0vn1fmA"; // Replace with your Mapbox token
const TELEGRAM_BOT_TOKEN =
  "7885100490:AAH_dz4DXJBQhZyQo2VfpoEfhjK5sMwLBEk"; // Your Telegram bot token
const TELEGRAM_CHAT_ID = "7329742224"; // Your Telegram chat ID
const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1329138480764424294/ApXOIfyGBzZHmTwWjMJ5AVXh6C-VCOO6B51wenQq42J-S-mjjMMC8YhMnB0lpBE-U5WB"; // Your Discord webhook URL
export default function Home() {
  const lastClickTime = useRef(0); // Track the last click time
  const doubleClickThreshold = 300; // Time limit (in milliseconds) for double-click detection
  let shakeThreshold = 20; // Adjust this value based on the intensity of the shake

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 20.5937, // Default to India's center
    longitude: 78.9629,
  });
  const [locationReady, setLocationReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const navigate = useNavigate();

  let mediaRecorder = null;
  let videoChunks = [];
  let mediaStream = null;

  const handleLocationSharingClick = () => {
    navigate("/locationSharing");
  };

  const handleHelplineButtonClick = () => {
    navigate("/helpline");
  };

  const sendLocationToTelegram = async () => {
    const mapsLink = `https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}`;
    const message = `📍 **Live Location Update!**\nLatitude: ${currentLocation.latitude}\nLongitude: ${currentLocation.longitude}\n[View on Maps](${mapsLink})`;

    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
      const response = await fetch(telegramApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      });

      if (response.ok) {
        console.log("Location sent to Telegram successfully!");
      } else {
        console.error("Failed to send location to Telegram");
      }
    } catch (error) {
      console.error("Error sending location to Telegram:", error);
    }
  };

  const sendVideoToTelegram = async (blob) => {
    const formData = new FormData();
    formData.append("chat_id", TELEGRAM_CHAT_ID);
    formData.append("video", blob, "video.webm");

    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendVideo`;

    try {
      const response = await fetch(telegramApiUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Video sent to Telegram successfully!");
      } else {
        console.error("Failed to send video to Telegram");
      }
    } catch (error) {
      console.error("Error sending video to Telegram:", error);
    }
  };

  // const startRecording = async () => {
  //   try {
  //     mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
  //     console.log("Camera access granted!");

  //     mediaRecorder = new MediaRecorder(mediaStream);
  //     videoChunks = [];

  //     mediaRecorder.ondataavailable = (event) => {
  //       if (event.data.size > 0) {
  //         videoChunks.push(event.data);
  //       }
  //     };

  //     mediaRecorder.onstop = async () => {
  //       const blob = new Blob(videoChunks, { type: "video/webm" });
  //       setVideoBlob(blob);
  //       await sendVideoToTelegram(blob);
  //     };

  //     mediaRecorder.start();
  //     setIsRecording(true);
  //     console.log("Recording started!");
  //   } catch (error) {
  //     console.error("Error starting recording:", error.message);
  //   }
  // };

  // const stopRecording = () => {
  //   if (mediaRecorder && mediaRecorder.state === "recording") {
  //     mediaRecorder.stop();
  //     setIsRecording(false);
  //     console.log("Recording stopped.");
  //     mediaStream.getTracks().forEach((track) => track.stop());
  //   }
  // };
  const startRecording = async () => {
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorder.ondataavailable = (event) => {
        videoChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(videoChunks, { type: "video/webm" });
        setVideoBlob(blob);
        videoChunks = [];
        sendVideoToTelegram(blob); // Send video to Telegram
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Record for 10 seconds and send the video to Telegram
      videoSendInterval = setInterval(() => {
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop();
          mediaRecorder.start();
        }
      }, 10000); // Stop and start recording every 10 seconds

      // Share location every 10 seconds while recording
      locationInterval = setInterval(() => {
        sendLocationToTelegram();
      }, 10000); // Share location every 10 seconds
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      clearInterval(recordingInterval); // Stop the recording interval
      clearInterval(locationInterval); // Stop location sharing interval
      clearInterval(videoSendInterval); // Stop video sending interval
      mediaRecorder.stop();
      setIsRecording(false); // Set the button back to SOS
      mediaStream.getTracks().forEach((track) => track.stop()); // Stop the camera stream
    }
  };

  const handleSOSButtonClick = async () => {
    const currentTime = Date.now();
    const timeDifference = currentTime - lastClickTime.current;

    if (timeDifference < doubleClickThreshold) {
      console.log("Button double-clicked!");

      if (isRecording) {
        stopRecording();
      } else {
        startRecording();
        await sendLocationToTelegram();
      }

      setIsRecording(!isRecording);
    }

    lastClickTime.current = currentTime;
  };

  // Power button detection simulation
  const handlePowerButtonPress = () => {
    powerButtonPressCount += 1;
    if (powerButtonPressCount >= 3) {
      handleSOSButtonClick();
      powerButtonPressCount = 0; // Reset after triggering SOS
    }
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // Reference for the audio instance

  const handleAlert = async () => {
    // Play alert sound
    if (!isPlaying) {
      try {
        audioRef.current = new Audio(buzzer);
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
      console.error('Error triggering alert:', error);
      alert('Failed to trigger alert in the background.');
    }
  };
  // Detect shaking of the device
  useEffect(() => {
    const handleShake = (event) => {
      const acceleration = event.accelerationIncludingGravity;
      const totalAcceleration = Math.sqrt(
        acceleration.x * acceleration.x +
        acceleration.y * acceleration.y +
        acceleration.z * acceleration.z
      );

      if (totalAcceleration > shakeThreshold) {
        handleSOSButtonClick();
      }
    };

    window.addEventListener("devicemotion", handleShake);

    return () => {
      window.removeEventListener("devicemotion", handleShake);
    };
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationReady(true);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-200">
      <SidebarWithNavbar />
      <div className="mt-16 px-4 md:px-8 flex-grow">
        <div className="w-full mb-4">
          <Map
            initialViewState={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              zoom: 13,
            }}
            style={{ width: "100%", height: "100vh" }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            {locationReady && (
              <>
                <Marker
                  latitude={currentLocation.latitude}
                  longitude={currentLocation.longitude}
                  anchor="bottom"
                >
                  <MapPin className="text-red-500 w-6 h-6" />
                </Marker>
                <Popup
                  latitude={currentLocation.latitude}
                  longitude={currentLocation.longitude}
                  closeOnClick={false}
                  closeButton={true}
                  anchor="top"
                >
                  <div>Your current location</div>
                </Popup>
              </>
            )}
          </Map>
        </div>
        <div className="bg-white shadow-lg rounded-t-lg p-4 fixed bottom-0 left-0 right-0 z-50">
          <div className="flex justify-between items-center">
            <div
              className="bg-blue-600 text-white p-4 rounded-full cursor-pointer"
              onClick={handleLocationSharingClick}
            >
              <MapPin />
            </div>
            <button
              onClick={handleSOSButtonClick}
              className={`bg-red-600 text-white p-4 rounded-full ${isRecording ? "bg-red-800" : ""
                }`}
            >
              {isRecording ? "Stop Recording" : "SOS"}
            </button>
            <div
              className="bg-blue-600 text-white p-4 rounded-full cursor-pointer"
              onClick={handleHelplineButtonClick}
            >
              <Phone />
            </div>
            <button
              onClick={handleAlert}
              className="bg-blue-600 text-white p-5 rounded-full cursor-pointer"
            >
              <FaBell />
            </button>
            <div  className="bg-blue-600 text-white p-4 rounded-full cursor-pointer"
            >
            <TidioChat />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}