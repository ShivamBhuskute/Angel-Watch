// import React, { useState } from "react";
// import { UserIcon, BellIcon, PhoneIcon, CogIcon, LockClosedIcon } from "@heroicons/react/solid";
// import NavBar from "../components/Navbar";

// const SettingsSection = () => {
//   const [notifications, setNotifications] = useState(true);
//   const [emergencyContact, setEmergencyContact] = useState("+1 (800) 123-4567");

//   const handleNotificationsChange = () => {
//     setNotifications(!notifications);
//   };

//   const handleEmergencyContactChange = (event) => {
//     setEmergencyContact(event.target.value);
//   };

//   return (
//     <div>
//       <NavBar />
//     <div className="min-h-screen bg-gradient-to-r from-pink-400 via-rose-300 to-blue-400 p-8">
//       <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
//         <h1 className="text-4xl font-extrabold text-center text-rose-500 mb-8 animate__animated animate__fadeInUp">
//           Settings
//         </h1>

//         {/* Profile Section */}
//         <div className="space-y-6">
//           <div className="p-6 bg-gradient-to-r from-rose-100 to-rose-200 rounded-lg shadow-md hover:shadow-xl transform transition-all hover:scale-105 duration-300">
//             <div className="flex items-center space-x-4">
//               <UserIcon className="h-10 w-10 text-rose-500" />
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800">Profile Settings</h3>
//                 <p className="mt-2 text-gray-600">Manage your personal profile information and preferences.</p>
//               </div>
//             </div>
//           </div>

//           {/* Notification Settings */}
//           <div className="p-6 bg-gradient-to-r from-rose-100 to-rose-200 rounded-lg shadow-md hover:shadow-xl transform transition-all hover:scale-105 duration-300">
//             <div className="flex items-center justify-between space-x-4">
//               <div className="flex items-center space-x-4">
//                 <BellIcon className="h-10 w-10 text-blue-500" />
//                 <h3 className="text-xl font-semibold text-gray-800">Notifications</h3>
//               </div>
//               <input
//                 type="checkbox"
//                 checked={notifications}
//                 onChange={handleNotificationsChange}
//                 className="toggle toggle-blue"
//               />
//             </div>
//             <p className="mt-2 text-gray-600">Enable or disable notifications based on your preferences.</p>
//           </div>

//           {/* Emergency Contact Settings */}
//           <div className="p-6 bg-gradient-to-r from-rose-100 to-rose-200 rounded-lg shadow-md hover:shadow-xl transform transition-all hover:scale-105 duration-300">
//             <div className="flex items-center space-x-4">
//               <PhoneIcon className="h-10 w-10 text-blue-500" />
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800">Emergency Contact</h3>
//                 <p className="mt-2 text-gray-600">Update your emergency contact details for quick access.</p>
//               </div>
//             </div>
//             <input
//               type="text"
//               value={emergencyContact}
//               onChange={handleEmergencyContactChange}
//               className="mt-4 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter emergency contact number"
//             />
//           </div>

//           {/* General Settings */}
//           <div className="p-6 bg-gradient-to-r from-rose-100 to-rose-200 rounded-lg shadow-md hover:shadow-xl transform transition-all hover:scale-105 duration-300">
//             <div className="flex items-center space-x-4">
//               <CogIcon className="h-10 w-10 text-blue-500" />
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800">General Settings</h3>
//                 <p className="mt-2 text-gray-600">Adjust general settings, such as theme, privacy, and security.</p>
//               </div>
//             </div>
//             <div className="mt-4 space-y-4">
//               {/* Theme Toggle */}
//               <div className="flex justify-between items-center">
//                 <p className="text-gray-800">Dark Mode</p>
//                 <input
//                   type="checkbox"
//                   className="toggle toggle-blue"
//                   // You can add functionality to toggle dark mode if required
//                 />
//               </div>

//               {/* Change Password */}
//               <div className="flex justify-between items-center">
//                 <p className="text-gray-800">Change Password</p>
//                 <button className="text-blue-500 hover:underline">Change</button>
//               </div>
//             </div>
//           </div>

//           {/* Security Section */}
//           <div className="p-6 bg-gradient-to-r from-rose-100 to-rose-200 rounded-lg shadow-md hover:shadow-xl transform transition-all hover:scale-105 duration-300">
//             <div className="flex items-center space-x-4">
//               <LockClosedIcon className="h-10 w-10 text-blue-500" />
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800">Security</h3>
//                 <p className="mt-2 text-gray-600">Manage your account security settings.</p>
//               </div>
//             </div>
//             <div className="mt-4">
//               <button className="w-full bg-blue-500 text-white p-3 rounded-lg focus:outline-none hover:bg-blue-600">
//                 Enable Two-Factor Authentication
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default SettingsSection;








import React, { useState } from "react";
import { UserIcon, BellIcon, PhoneIcon, CogIcon, LockClosedIcon } from "@heroicons/react/solid";
import NavBar from "../components/Navbar";

const SettingSection = () => {
  const [notifications, setNotifications] = useState(true);
  const [emergencyContact, setEmergencyContact] = useState("+1 (800) 123-4567");

  const handleNotificationsChange = () => {
    setNotifications(!notifications);
  };

  const handleEmergencyContactChange = (event) => {
    setEmergencyContact(event.target.value);
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-pink-50 p-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-pink-500 mb-8">
            Settings
          </h1>

          <div className="space-y-6">
            {/* Profile Section */}
            <div className="p-6 bg-white border border-pink-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center space-x-4">
                <UserIcon className="h-10 w-10 text-pink-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Profile Settings</h3>
                  <p className="mt-1 text-gray-600 text-sm">
                    Manage your personal profile information and preferences.
                  </p>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="p-6 bg-white border border-pink-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <BellIcon className="h-10 w-10 text-pink-500" />
                  <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                </div>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={handleNotificationsChange}
                  className="toggle toggle-pink"
                />
              </div>
              <p className="mt-2 text-gray-600 text-sm">
                Enable or disable notifications based on your preferences.
              </p>
            </div>

            {/* Emergency Contact Settings */}
            <div className="p-6 bg-white border border-pink-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center space-x-4">
                <PhoneIcon className="h-10 w-10 text-pink-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Emergency Contact</h3>
                  <p className="mt-1 text-gray-600 text-sm">
                    Update your emergency contact details for quick access.
                  </p>
                </div>
              </div>
              <input
                type="text"
                value={emergencyContact}
                onChange={handleEmergencyContactChange}
                className="mt-4 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter emergency contact number"
              />
            </div>

            {/* General Settings */}
            <div className="p-6 bg-white border border-pink-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center space-x-4">
                <CogIcon className="h-10 w-10 text-pink-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">General Settings</h3>
                  <p className="mt-1 text-gray-600 text-sm">
                    Adjust general settings, such as theme, privacy, and security.
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-4">
                {/* Theme Toggle */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-800">Dark Mode</p>
                  <input
                    type="checkbox"
                    className="toggle toggle-pink"
                  />
                </div>

                {/* Change Password */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-800">Change Password</p>
                  <button className="text-pink-500 hover:underline">Change</button>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="p-6 bg-white border border-pink-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center space-x-4">
                <LockClosedIcon className="h-10 w-10 text-pink-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Security</h3>
                  <p className="mt-1 text-gray-600 text-sm">
                    Manage your account security settings.
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <button className="w-full bg-pink-500 text-white p-3 rounded-lg focus:outline-none hover:bg-pink-600">
                  Enable Two-Factor Authentication
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingSection;
