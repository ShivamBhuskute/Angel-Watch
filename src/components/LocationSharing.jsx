import { useState, useEffect, useCallback } from "react";
import Map, { Marker, NavigationControl, Source, Layer } from "react-map-gl";
import { Geolocation } from "@capacitor/geolocation";
import { Toast } from "@capacitor/toast";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaMapMarkerAlt, FaShareAlt } from "react-icons/fa";
import NavBar from "../components/Navbar";
// Replace with your Mapbox token
const MAPBOX_TOKEN = "pk.eyJ1IjoidGVqYXMxOTM2IiwiYSI6ImNtNXk1b3p6aTBmN3oycW45anIxeGIyeGYifQ.g8zrtImUGHjJyyp0vn1fmA";

export default function LocationSharing() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [contacts] = useState([]);

  // Fetch user location on initial render
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const position = await Geolocation.getCurrentPosition();
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      } catch (error) {
        console.error("Error fetching location:", error);
        alert("Failed to fetch location. Please ensure location permissions are enabled.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  // Fetch route whenever currentLocation or destination is updated
  const fetchRoute = useCallback(async () => {
    if (!currentLocation || !destination) return;

    const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${currentLocation.longitude},${currentLocation.latitude};${destination.longitude},${destination.latitude}?access_token=${MAPBOX_TOKEN}&alternatives=false&geometries=geojson`;

    try {
      const response = await fetch(routeUrl);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        setRoute(data.routes[0]); // Set the route details
      } else {
        alert("No route found");
      }
    } catch (error) {
      console.error("Error fetching route:", error);
      alert("Failed to fetch route.");
    }
  }, [currentLocation, destination]);

  useEffect(() => {
    fetchRoute();
  }, [currentLocation, destination, fetchRoute]);

  const handleSendToWhatsApp = async () => {
    const token = "EAAIPvHcyUqEBOwK2TuPDP1haCwTJZAabAhuW4Irdedr8x9PAZAZCtT891INY8fWsXzWpUQWGjSeFIphok08qL45L09StecdU9ZARnluyTZCKH3J2KcbXHc7y5u8eZAcNl2N7iPUqeiZAgc5hHoWUu320ZCizvxL1tkioiQeu6TOWlNhNL3AUwbt9IhRWstzmegklNakU5fHnIqemZAcjTplWlK2PAw6ZB4jAiiE7sZD";
    const phoneNumberId = "63101734927848";
    const recipient = '+15551538197'; // Replace with the recipient's phone number

    const data = {
      messaging_product: "whatsapp",
      to: recipient,
      type: "text",  // Change this to "video" if sending video
      text: {
        body: "Emergency! My location: https://maps.google.com/?q=LAT,LONG"
      },
    };

    try {
      await axios.post(
        `https://graph.facebook.com/v16.0/${phoneNumberId}/messages`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };

  // Handle location selection from the map
  const handleLocationSelection = (e) => {
    const { lngLat } = e;
    setSelectedLocation({
      latitude: lngLat.lat,
      longitude: lngLat.lng,
    });

    // Set the destination as the selected location
    setDestination({
      latitude: lngLat.lat,
      longitude: lngLat.lng,
    });
  };

  // Send live location to Discord
  const sendLocationToDiscord = () => {
    if (!currentLocation || !route) {
      alert("Location or route not available");
      return;
    }

    const routeInstructions = route.legs[0].steps.map((step) => step.maneuver.instruction).join("\n");

    const discordWebhookUrl = "https://discord.com/api/webhooks/1329138480764424294/ApXOIfyGBzZHmTwWjMJ5AVXh6C-VCOO6B51wenQq42J-S-mjjMMC8YhMnB0lpBE-U5WB";

    fetch(discordWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `
          Emergency: User's current location: https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}
          Directions: 
          ${routeInstructions}
          Route Path: https://www.google.com/maps/dir/?api=1&origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${destination.latitude},${destination.longitude}
        `,
      }),
    })
      .then(() => {
        Toast.show({
          text: "Location shared to Discord!",
        });
      })
      .catch((error) => {
        console.error("Error sharing location:", error);
        alert("Failed to share location.");
      });
  };

  // Send live location to Telegram
  const sendLocationToTelegram = () => {
    if (!currentLocation || !route) {
      alert("Location or route not available");
      return;
    }

    const telegramBotToken = "7885100490:AAH_dz4DXJBQhZyQo2VfpoEfhjK5sMwLBEk"; // Your bot token
    const telegramChatId = "7329742224"; // Your chat ID
    const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

    const routeInstructions = route.legs[0].steps.map((step) => step.maneuver.instruction).join("\n");

    const message = `
      🚨 Emergency: User's current location: https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}
      Directions: 
      ${routeInstructions}
      Route Path: https://www.google.com/maps/dir/?api=1&origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${destination.latitude},${destination.longitude}
    `;

    fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: message,
      }),
    })
      .then(() => {
        Toast.show({
          text: "Location shared to Telegram!",
        });
      })
      .catch((error) => {
        console.error("Error sharing location to Telegram:", error);
        alert("Failed to share location to Telegram.");
      });
  };

  // Prepare the path as a GeoJSON object
  const geojsonPath = route
    ? {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: route.geometry.coordinates, // Use the coordinates from the route API
          },
        },
      ],
    }
    : null;

  return (
    <div>
      <NavBar />
      <div className="p-4 pt-20 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Women Safety - Live Location Sharing</h1>

        {loading ? (
          <p>Fetching location...</p>
        ) : currentLocation ? (
          <div className="w-full mb-4 " style={{ height: '550px' }}>
            <Map
              initialViewState={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                zoom: 13,
              }}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxAccessToken={MAPBOX_TOKEN}
              onClick={handleLocationSelection}
            >
              <Marker latitude={currentLocation.latitude} longitude={currentLocation.longitude}>
                <FaMapMarkerAlt className="text-red-500 text-xl" />
              </Marker>

              {selectedLocation && (
                <Marker
                  latitude={selectedLocation.latitude}
                  longitude={selectedLocation.longitude}
                >
                  <FaMapMarkerAlt className="text-green-500 text-xl" />
                </Marker>
              )}

              {route && geojsonPath && (
                <Source id="route" type="geojson" data={geojsonPath}>
                  <Layer
                    id="route-line"
                    type="line"
                    source="route"
                    paint={{
                      "line-color": "#007cbf",
                      "line-width": 5,
                    }}
                  />
                </Source>
              )}

              <NavigationControl position="top-left" />
            </Map>
          </div>
        ) : (
          <p>Location unavailable.</p>
        )}

        {/* {route && (
          <div className="absolute bottom-10 left-4 p-2  rounded-lg mb-4">
            <h3 className="font-bold">Route Information</h3>
            <p>Distance: {(route.distance / 1000).toFixed(2)} km</p>
            <p>Duration: {Math.round(route.duration / 60)} min</p>
          </div>  
        )} */}

        <button
          onClick={sendLocationToDiscord}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center mt-4"
        >
          <FaShareAlt className="mr-2" />
          Share Location to Discord
        </button>

        <button
          onClick={sendLocationToTelegram}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 flex items-center mt-4"
        >
          <FaShareAlt className="mr-2" />
          Share Location to Telegram
        </button>
      
      </div>
    </div>
  );
}












// import { useState, useEffect, useCallback } from "react";
// import Map, { Marker, NavigationControl, Source, Layer } from "react-map-gl";
// import { Geolocation } from "@capacitor/geolocation";
// import { Toast } from "@capacitor/toast";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { FaMapMarkerAlt, FaShareAlt } from "react-icons/fa";

// // Replace with your Mapbox token
// const MAPBOX_TOKEN = "pk.eyJ1IjoidGVqYXMxOTM2IiwiYSI6ImNtNXk1b3p6aTBmN3oycW45anIxeGIyeGYifQ.g8zrtImUGHjJyyp0vn1fmA";

// export default function LocationSharing() {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [destination, setDestination] = useState(null);
//   const [route, setRoute] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [contacts] = useState([]);

//   // Fetch user location on initial render
//   useEffect(() => {
//     const fetchLocation = async () => {
//       try {
//         const position = await Geolocation.getCurrentPosition();
//         setCurrentLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       } catch (error) {
//         console.error("Error fetching location:", error);
//         alert("Failed to fetch location. Please ensure location permissions are enabled.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLocation();
//   }, []);

//   // Fetch route whenever currentLocation or destination is updated
//   const fetchRoute = useCallback(async () => {
//     if (!currentLocation || !destination) return;

//     const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${currentLocation.longitude},${currentLocation.latitude};${destination.longitude},${destination.latitude}?access_token=${MAPBOX_TOKEN}&alternatives=false&geometries=geojson`;

//     try {
//       const response = await fetch(routeUrl);
//       const data = await response.json();

//       if (data.routes && data.routes.length > 0) {
//         setRoute(data.routes[0]); // Set the route details
//       } else {
//         alert("No route found");
//       }
//     } catch (error) {
//       console.error("Error fetching route:", error);
//       alert("Failed to fetch route.");
//     }
//   }, [currentLocation, destination]);

//   useEffect(() => {
//     fetchRoute();
//   }, [currentLocation, destination, fetchRoute]);

//   // Handle location selection from the map
//   const handleLocationSelection = (e) => {
//     const { lngLat } = e;
//     setSelectedLocation({
//       latitude: lngLat.lat,
//       longitude: lngLat.lng,
//     });

//     // Set the destination as the selected location
//     setDestination({
//       latitude: lngLat.lat,
//       longitude: lngLat.lng,
//     });
//   };

//   // Send live location to Discord
//   const sendLocationToDiscord = () => {
//     if (!currentLocation || !route) {
//       alert("Location or route not available");
//       return;
//     }

//     const routeInstructions = route.legs[0].steps.map((step) => step.maneuver.instruction).join("\n");

//     // Replace with your Discord webhook URL
//     const discordWebhookUrl = "https://discord.com/api/webhooks/1329138480764424294/ApXOIfyGBzZHmTwWjMJ5AVXh6C-VCOO6B51wenQq42J-S-mjjMMC8YhMnB0lpBE-U5WB";

//     fetch(discordWebhookUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         content: `
//           Emergency: User's current location: https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}
//           Directions: 
//           ${routeInstructions}
//           Route Path: https://www.google.com/maps/dir/?api=1&origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${destination.latitude},${destination.longitude}
//         `,
//       }),
//     })
//       .then(() => {
//         Toast.show({
//           text: "Location shared to Discord!",
//         });
//       })
//       .catch((error) => {
//         console.error("Error sharing location:", error);
//         alert("Failed to share location.");
//       });
//   };

//   // Prepare the path as a GeoJSON object
//   const geojsonPath = route
//     ? {
//         type: "FeatureCollection",
//         features: [
//           {
//             type: "Feature",
//             geometry: {
//               type: "LineString",
//               coordinates: route.geometry.coordinates, // Use the coordinates from the route API
//             },
//           },
//         ],
//       }
//     : null;

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
//       <h1 className="text-2xl font-bold mb-4">Women Safety - Live Location Sharing</h1>

//       {loading ? (
//         <p>Fetching location...</p>
//       ) : currentLocation ? (
//         <div className="w-full h-96 mb-4">
//           <Map
//             initialViewState={{
//               latitude: currentLocation.latitude,
//               longitude: currentLocation.longitude,
//               zoom: 13,
//             }}
//             style={{ width: "100%", height: "100%" }}
//             mapStyle="mapbox://styles/mapbox/streets-v11"
//             mapboxAccessToken={MAPBOX_TOKEN}
//             onClick={handleLocationSelection}
//           >
//             <Marker latitude={currentLocation.latitude} longitude={currentLocation.longitude}>
//               <FaMapMarkerAlt className="text-red-500 text-xl" />
//             </Marker>

//             {selectedLocation && (
//               <Marker
//                 latitude={selectedLocation.latitude}
//                 longitude={selectedLocation.longitude}
//               >
//                 <FaMapMarkerAlt className="text-green-500 text-xl" />
//               </Marker>
//             )}

//             {route && geojsonPath && (
//               <Source id="route" type="geojson" data={geojsonPath}>
//                 <Layer
//                   id="route-line"
//                   type="line"
//                   source="route"
//                   paint={{
//                     "line-color": "#007cbf",
//                     "line-width": 5,
//                   }}
//                 />
//               </Source>
//             )}

//             <NavigationControl position="top-left" />
//           </Map>
//         </div>
//       ) : (
//         <p>Location unavailable.</p>
//       )}

//       {route && (
//         <div className="absolute top-4 left-4 p-2 bg-white rounded-lg shadow-md mb-4">
//           <h3 className="font-bold">Route Information</h3>
//           <p>Distance: {(route.distance / 1000).toFixed(2)} km</p>
//           <p>Duration: {Math.round(route.duration / 60)} min</p>
//         </div>
//       )}

//       <button
//         onClick={sendLocationToDiscord}
//         className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center"
//       >
//         <FaShareAlt className="mr-2" />
//         Share Location to Discord
//       </button>

//       <div className="mt-4">
//         <h2 className="text-lg font-bold">Emergency Contacts</h2>
//         <ul>
//           {contacts.map((contact, index) => (
//             <li key={index}>{contact}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }










// // import { useState, useEffect } from "react";
// // import Map, { Marker, Popup, NavigationControl, Source, Layer } from "react-map-gl";
// // import { Geolocation } from "@capacitor/geolocation";
// // import { Toast } from "@capacitor/toast";
// // import "mapbox-gl/dist/mapbox-gl.css";
// // import { FaMapMarkerAlt, FaShareAlt } from "react-icons/fa";
// // // import mapboxgl from "mapbox-gl";

// // // Replace with your Mapbox token
// // const MAPBOX_TOKEN = "pk.eyJ1IjoidGVqYXMxOTM2IiwiYSI6ImNtNXk1b3p6aTBmN3oycW45anIxeGIyeGYifQ.g8zrtImUGHjJyyp0vn1fmA"; // Replace with your Mapbox token

// // export default function LocationSharing() {
// //   const [currentLocation, setCurrentLocation] = useState(null);
// //   const [destination, setDestination] = useState(null);
// //   const [route, setRoute] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedLocation, setSelectedLocation] = useState(null);
// //   const [contacts,setContacts] = useState([]);
// //   const [watchId, setWatchId] = useState(null);

// //   // Fetch initial user location
// //   useEffect(() => {
// //     const fetchLocation = async () => {
// //       try {
// //         const position = await Geolocation.getCurrentPosition();
// //         setCurrentLocation({
// //           latitude: position.coords.latitude,
// //           longitude: position.coords.longitude,
// //         });
// //       } catch (error) {
// //         console.error("Error fetching location:", error);
// //         alert("Failed to fetch location. Please ensure location permissions are enabled.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchLocation();
// //   }, []);

// //   // Start watching the user's location
// //   useEffect(() => {
// //     if (currentLocation) {
// //       const watchLocation = async () => {
// //         const id = await Geolocation.watchPosition(
// //           { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
// //           (position) => {
// //             const { latitude, longitude } = position.coords;
// //             setCurrentLocation({ latitude, longitude });

// //             // Send updated location to Firebase
// //             sendLocationToFirebase(latitude, longitude);
// //           }
// //         );
// //         setWatchId(id);
// //       };

// //       watchLocation();
// //     }

// //     // Cleanup on component unmount
// //     return () => {
// //       if (watchId) {
// //         Geolocation.clearWatch({ id: watchId });
// //       }
// //     };
// //   }, [currentLocation]);

// //   // Fetch route whenever currentLocation or destination is updated
// //   useEffect(() => {
// //     if (currentLocation && destination) {
// //       fetchRoute();
// //     }
// //   }, [currentLocation, destination]);

// //   // Fetch route from current location to destination
// //   const fetchRoute = async () => {
// //     const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${currentLocation.longitude},${currentLocation.latitude};${destination.longitude},${destination.latitude}?access_token=${MAPBOX_TOKEN}&alternatives=false`;

// //     try {
// //       const response = await fetch(routeUrl);
// //       const data = await response.json();

// //       if (data.routes && data.routes.length > 0) {
// //         setRoute(data.routes[0]);
// //       } else {
// //         alert("No route found");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching route:", error);
// //       alert("Failed to fetch route.");
// //     }
// //   };

// //   // Handle location selection from the map
// //   const handleLocationSelection = (e) => {
// //     const { lngLat } = e;
// //     setSelectedLocation({
// //       latitude: lngLat.lat,
// //       longitude: lngLat.lng,
// //     });

// //     // Set the destination as the selected location
// //     setDestination({
// //       latitude: lngLat.lat,
// //       longitude: lngLat.lng,
// //     });
// //   };

// //   // Send location to Firebase (which will forward it to Discord)
// //   const sendLocationToFirebase = async (latitude, longitude) => {
// //     if (!latitude || !longitude) {
// //       alert("Location not available");
// //       return;
// //     }

// //     // Replace with your Firebase Function endpoint URL
// //     const firebaseFunctionUrl = "https://us-central1-your-project-id.cloudfunctions.net/sendLocationToDiscord";

// //     try {
// //       const response = await fetch(firebaseFunctionUrl, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ latitude, longitude }),
// //       });

// //       if (response.ok) {
// //         // Show success message to the user
// //         Toast.show({
// //           text: "Location shared to Discord!",
// //         });
// //       } else {
// //         alert("Failed to share location.");
// //       }
// //     } catch (error) {
// //       console.error("Error sharing location:", error);
// //       alert("Failed to share location.");
// //     }
// //   };

// //   // Prepare the path as a GeoJSON object
// //   const geojsonPath = route ? {
// //     type: "FeatureCollection",
// //     features: [
// //       {
// //         type: "Feature",
// //         geometry: {
// //           type: "LineString",
// //           coordinates: [
// //             [currentLocation.longitude, currentLocation.latitude],
// //             [destination.longitude, destination.latitude],
// //           ],
// //         },
// //       },
// //     ],
// //   } : null;

// //   return (
// //     <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
// //       <h1 className="text-2xl font-bold mb-4">Women Safety - Live Location Sharing</h1>

// //       {loading ? (
// //         <p>Fetching location...</p>
// //       ) : currentLocation ? (
// //         <div className="w-full h-96 mb-4">
// //           <Map
// //             initialViewState={{
// //               latitude: currentLocation.latitude,
// //               longitude: currentLocation.longitude,
// //               zoom: 13,
// //             }}
// //             style={{ width: "100%", height: "100%" }}
// //             mapStyle="mapbox://styles/mapbox/streets-v11"
// //             mapboxAccessToken={MAPBOX_TOKEN}
// //             onClick={handleLocationSelection}
// //           >
// //             <Marker latitude={currentLocation.latitude} longitude={currentLocation.longitude}>
// //               <FaMapMarkerAlt className="text-red-500 text-xl" />
// //             </Marker>

// //             {selectedLocation && (
// //               <Marker
// //                 latitude={selectedLocation.latitude}
// //                 longitude={selectedLocation.longitude}
// //               >
// //                 <FaMapMarkerAlt className="text-green-500 text-xl" />
// //               </Marker>
// //             )}

// //             {route && geojsonPath && (
// //               <Source id="route" type="geojson" data={geojsonPath}>
// //                 <Layer
// //                   id="route-line"
// //                   type="line"
// //                   source="route"
// //                   paint={{
// //                     "line-color": "#007cbf",
// //                     "line-width": 5,
// //                   }}
// //                 />
// //               </Source>
// //             )}

// //             {/* Navigation controls for zooming and rotating */}
// //             <NavigationControl position="top-left" />
// //           </Map>
// //         </div>
// //       ) : (
// //         <p>Location unavailable.</p>
// //       )}

// //       {/* Route Information */}
// //       {route && (
// //         <div className="absolute top-4 left-4 p-2 bg-white rounded-lg shadow-md mb-4">
// //           <h3 className="font-bold">Route Information</h3>
// //           <p>Distance: {route.distance / 1000} km</p>
// //           <p>Duration: {Math.round(route.duration / 60)} min</p>
// //         </div>
// //       )}

// //       {/* Share Location Button */}
// //       <button
// //         onClick={() => sendLocationToFirebase(currentLocation.latitude, currentLocation.longitude)}
// //         className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center"
// //       >
// //         <FaShareAlt className="mr-2" />
// //         Share Location to Discord
// //       </button>

// //       <div className="mt-4">
// //         <h2 className="text-lg font-bold">Emergency Contacts</h2>
// //         <ul>
// //           {contacts.map((contact, index) => (
// //             <li key={index}>{contact}</li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // }