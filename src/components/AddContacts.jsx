// import React, { useState } from "react";
// import { UserPlus, Trash, Phone, ArrowRight } from "lucide-react";

// export default function AddContacts() {
//   const [contacts, setContacts] = useState([""]); // Initialize with one empty contact
//   const maxContacts = 5;

//   const handleAddContact = () => {
//     if (contacts.length < maxContacts) {
//       setContacts([...contacts, ""]);
//     }
//   };

//   const handleRemoveContact = (index) => {
//     setContacts(contacts.filter((_, i) => i !== index));
//   };

//   const handleChangeContact = (index, value) => {
//     const updatedContacts = [...contacts];
//     updatedContacts[index] = value;
//     setContacts(updatedContacts);
//   };

//   const handleSaveContacts = () => {
//     if (contacts.some((contact) => !contact.trim())) {
//       alert("Please fill in all contact fields before saving.");
//       return;
//     }
//     console.log("Emergency Contacts Saved:", contacts);
//     alert("Emergency contacts saved successfully!");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-4">
//       <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
//         <div className="p-6 sm:p-8">
//           <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-6 mx-auto">
//             <Phone className="w-8 h-8" />
//           </div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">
//             Emergency Contacts
//           </h1>
//           <p className="text-sm text-gray-500 mb-6 text-center">
//             Add up to 5 trusted contacts. These contacts will be notified in
//             case of an emergency with your location.
//           </p>
//           <div className="space-y-4 mb-6">
//             {contacts.map((contact, index) => (
//               <div key={index} className="flex items-center space-x-3">
//                 <input
//                   type="tel"
//                   placeholder={`Contact ${index + 1}`}
//                   value={contact}
//                   onChange={(e) =>
//                     handleChangeContact(index, e.target.value)
//                   }
//                   className="w-full border rounded-lg px-3 py-2 text-sm outline-none text-gray-600"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveContact(index)}
//                   className="text-red-600 hover:text-red-700 transition"
//                   aria-label="Remove contact"
//                   disabled={contacts.length === 1}
//                 >
//                   <Trash className="w-5 h-5" />
//                 </button>
//               </div>
//             ))}
//             {contacts.length < maxContacts && (
//               <button
//                 type="button"
//                 onClick={handleAddContact}
//                 className="flex items-center justify-center w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
//               >
//                 <UserPlus className="w-5 h-5 mr-2" />
//                 Add Contact
//               </button>
//             )}
//           </div>
//           <button
//             onClick={handleSaveContacts}
//             className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Save Contacts
//           </button>
//           <div className="flex justify-between items-center mt-4">
//             <p className="text-sm text-gray-500">1 of 2 steps</p>
//             <button
//               className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center space-x-2 text-sm sm:text-base"
//               aria-label="Proceed to the next step"
//             >
//               <span>Next</span>
//               <ArrowRight className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//         <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
//           <p className="text-xs text-gray-500 text-center">
//             Add trusted contacts to ensure they are notified during emergencies.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }








import React, { useState, useEffect } from "react";
import { UserPlus, Trash, Phone, ArrowRight } from "lucide-react";
import NavBar from "./Navbar";

export default function AddContacts() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("emergencyContacts");
    return savedContacts ? JSON.parse(savedContacts) : [""];
  });
  const maxContacts = 5;

  const handleAddContact = () => {
    if (contacts.length < maxContacts) {
      setContacts([...contacts, ""]);
    }
  };

  const handleRemoveContact = (index) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const handleChangeContact = (index, value) => {
    const updatedContacts = [...contacts];
    updatedContacts[index] = value;
    setContacts(updatedContacts);
  };

  const handleSaveContacts = () => {
    if (contacts.some((contact) => !contact.trim())) {
      alert("Please fill in all contact fields before saving.");
      return;
    }
    localStorage.setItem("emergencyContacts", JSON.stringify(contacts));
    alert("Emergency contacts saved successfully!");
  };

  return (
    <div>
    <div>
        <NavBar />
    </div>
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-6 mx-auto">
            <Phone className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">
            Emergency Contacts
          </h1>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Add up to 5 trusted contacts. These contacts will be notified in
            case of an emergency with your location.
          </p>
          <div className="space-y-4 mb-6">
            {contacts.map((contact, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="tel"
                  placeholder={`Contact ${index + 1}`}
                  value={contact}
                  onChange={(e) =>
                    handleChangeContact(index, e.target.value)
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none text-gray-600"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveContact(index)}
                  className="text-red-600 hover:text-red-700 transition"
                  aria-label="Remove contact"
                  disabled={contacts.length === 1}
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            ))}
            {contacts.length < maxContacts && (
              <button
                type="button"
                onClick={handleAddContact}
                className="flex items-center justify-center w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Add Contact
              </button>
            )}
          </div>
          <button
            onClick={handleSaveContacts}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Contacts
          </button>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">1 of 2 steps</p>
            <button
              className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center space-x-2 text-sm sm:text-base"
              aria-label="Proceed to the next step"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            Add trusted contacts to ensure they are notified during emergencies.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}