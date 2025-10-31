import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import Login from "../assets/Login.png";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { app } from "../firebase"; // Import your Firebase app instance

const auth = getAuth(app); // Initialize auth with the Firebase app
const googleProvider = new GoogleAuthProvider();

function AccountPage() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      // Use signInWithRedirect for better mobile compatibility
      if (window.innerWidth < 768) {
        await signInWithRedirect(auth, googleProvider);
      } else {
        const result = await signInWithPopup(auth, googleProvider);
        console.log("User signed in:", result.user);
        navigate("/homeMain");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error.message);
      alert("Sign-in failed. Please try again.");
    }
  };

  useEffect(() => {
    // Handle Google redirect results
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log("User signed in via redirect:", result.user);
          navigate("/homeMain");
        }
      } catch (error) {
        console.error("Error handling redirect result:", error.message);
      }
    };

    handleRedirectResult();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white p-6 text-gray-800">
      {/* Header Section */}
      <div className="w-full flex justify-between items-center py-4 border-b border-pink-200">
        <img src={logo} alt="AngelWatch Logo" className="h-14" />
        <h1 className="text-lg font-bold text-pink-600">Welcome</h1>
      </div>

      {/* Illustration Section */}
      <div className="flex flex-col items-center space-y-4 mt-8">
        <img src={Login} alt="Illustration" className="h-64 object-contain rounded-lg" />
        <h2 className="text-2xl font-bold text-pink-600">AngelWatch</h2>
        <p className="text-sm text-gray-500 text-center">
          Your companion for safety and emergency assistance.
        </p>
      </div>

      {/* Buttons Section */}
      <div className="w-full max-w-sm mt-8 flex flex-col space-y-4">
        <button
          onClick={() => navigate("/loginPage")}
          className="w-full bg-pink-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-pink-700 transition duration-200"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signUp")}
          className="w-full bg-pink-100 text-pink-600 py-3 rounded-lg font-medium shadow-md hover:bg-pink-200 transition duration-200"
        >
          Sign Up
        </button>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-pink-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-pink-700 transition duration-200"
        >
          Login with Google
        </button>
      </div>

      {/* Footer Section */}
      <div className="w-full py-4 border-t border-pink-200 text-center text-xs text-gray-500 mt-8">
        © {new Date().getFullYear()} AngelWatch. All rights reserved.
      </div>
    </div>
  );
}

export default AccountPage;










// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import logo from "../assets/logo.png";
// import Login from "../assets/Login.png";
// import {
//   getAuth,
//   GoogleAuthProvider,
//   signInWithPopup,
//   signInWithRedirect,
//   getRedirectResult,
// } from "firebase/auth";
// import { app } from "../firebase"; // Import your Firebase app instance

// const auth = getAuth(app); // Initialize auth with the Firebase app
// const googleProvider = new GoogleAuthProvider();

// function AccountPage() {
//   const navigate = useNavigate();

//   const handleGoogleSignIn = async () => {
//     try {
//       // Use signInWithRedirect for better mobile compatibility
//       if (window.innerWidth < 768) {
//         await signInWithRedirect(auth, googleProvider);
//       } else {
//         const result = await signInWithPopup(auth, googleProvider);
//         console.log("User signed in:", result.user);
//         navigate("/homeMain");
//       }
//     } catch (error) {
//       console.error("Error during Google sign-in:", error.message);
//       alert("Sign-in failed. Please try again.");
//     }
//   };

//   useEffect(() => {
//     // Handle Google redirect results
//     const handleRedirectResult = async () => {
//       try {
//         const result = await getRedirectResult(auth);
//         if (result) {
//           console.log("User signed in via redirect:", result.user);
//           navigate("/homeMain");
//         }
//       } catch (error) {
//         console.error("Error handling redirect result:", error.message);
//       }
//     };

//     handleRedirectResult();
//   }, [navigate]);

//   return (
//     <div className="flex flex-col items-center justify-between min-h-screen bg-white p-6 text-gray-800">
//       {/* Header Section */}
//       <div className="w-full flex justify-between items-center py-4 border-b border-gray-300">
//         <img src={logo} alt="AngelWatch Logo" className="h-14" />
//         <h1 className="text-lg font-bold text-gray-900">Welcome</h1>
//       </div>

//       {/* Illustration Section */}
//       <div className="flex flex-col items-center space-y-4">
//         <img src={Login} alt="Illustration" className="h-64 object-contain rounded-lg" />
//         <h2 className="text-xl font-bold text-gray-900">AngelWatch</h2>
//         <p className="text-sm text-gray-600 text-center">
//           Your companion for safety and emergency assistance.
//         </p>
//       </div>

//       {/* Buttons Section */}
//       <div className="w-full flex flex-col space-y-4">
//         <button
//           onClick={() => navigate("/loginPage")}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 transition duration-200"
//         >
//           Login
//         </button>
//         <button
//           onClick={() => navigate("/signUp")}
//           className="w-full bg-gray-100 text-blue-600 py-3 rounded-lg font-medium shadow-md hover:bg-gray-200 transition duration-200"
//         >
//           Sign Up
//         </button>

//         {/* Google Login Button */}
//         <button
//           onClick={handleGoogleSignIn}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 transition duration-200"
//         >
//           Login with Google
//         </button>
//       </div>

//       {/* Footer Section */}
//       <div className="w-full py-4 border-t border-gray-300 text-center text-xs text-gray-500">
//         Â© {new Date().getFullYear()} AngelWatch. All rights reserved.
//       </div>
//     </div>
//   );
// }

// export default AccountPage;










// import React from "react";
// import { useNavigate } from "react-router-dom";

// import logo from "../assets/logo.png";
// import Login from "../assets/Login.png";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { app } from "../firebase"; // Import your Firebase app instance

// const auth = getAuth(app); // Initialize auth with the Firebase app
// const googleProvider = new GoogleAuthProvider();

// function AccountPage() {
//   const navigate = useNavigate();

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       console.log("User signed in:", result.user);
//       // Navigate to the home page after successful login
//       navigate("/homeMain");
//     } catch (error) {
//       console.error("Error during Google sign-in:", error.message);
//       alert("Sign-in failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-between min-h-screen bg-white p-6 text-gray-800">
//       {/* Header Section */}
//       <div className="w-full flex justify-between items-center py-4 border-b border-gray-300">
//         <img src={logo} alt="AngelWatch Logo" className="h-14" />
//         <h1 className="text-lg font-bold text-gray-900">Welcome</h1>
//       </div>

//       {/* Illustration Section */}
//       <div className="flex flex-col items-center space-y-4">
//         <img src={Login} alt="Illustration" className="h-64 object-contain rounded-lg" />
//         <h2 className="text-xl font-bold text-gray-900">AngelWatch</h2>
//         <p className="text-sm text-gray-600 text-center">
//           Your companion for safety and emergency assistance.
//         </p>
//       </div>

//       {/* Buttons Section */}
//       <div className="w-full flex flex-col space-y-4">
//         <button
//           onClick={() => navigate("/loginPage")}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 transition duration-200"
//         >
//           Login
//         </button>
//         <button
//           onClick={() => navigate("/signUp")}
//           className="w-full bg-gray-100 text-blue-600 py-3 rounded-lg font-medium shadow-md hover:bg-gray-200 transition duration-200"
//         >
//           Sign Up
//         </button>

//         {/* Google Login Button */}
//         <button
//           onClick={handleGoogleSignIn}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 transition duration-200"
//         >
//           Login with Google
//         </button>
//       </div>

//       {/* Footer Section */}
//       <div className="w-full py-4 border-t border-gray-300 text-center text-xs text-gray-500">
//         Â© {new Date().getFullYear()} AngelWatch. All rights reserved.
//       </div>
//     </div>
//   );
// }

// export default AccountPage;














































// import React from "react";
// import { useNavigate } from "react-router-dom";

// import logo from "../assets/logo.png";
// import Login from "../assets/Login.png";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { app } from "../firebase"; // Import your Firebase app instance

// const auth = getAuth(app); // Initialize auth with the Firebase app
// const googleProvider = new GoogleAuthProvider();

// function AccountPage() {
//   const navigate = useNavigate();

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       console.log("User signed in:", result.user);
//       // Navigate to the home page after successful login
//       navigate("/homeMain");
//     } catch (error) {
//       console.error("Error during Google sign-in:", error.message);
//       alert("Sign-in failed. Please try again.");
//     }
//   };


//   React.useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       getRedirectResult(auth)
//         .then((result) => {
//           if (result) {
//             console.log("User signed in:", result.user);
//             navigate("/homeMain");
//           } else {
//             console.log("No result returned from getRedirectResult.");
//           }
//         })
//         .catch((error) => {
//           console.error("Error handling redirect result:", error);
//         });
//     }, 100); // Adjust the delay as needed
  
//     return () => clearTimeout(timeoutId);
//   }, [navigate]);
  


//   return (
//     <div className="flex flex-col items-center justify-between min-h-screen bg-white p-6 text-gray-800">
//       {/* Header Section */}
//       <div className="w-full flex justify-between items-center py-4 border-b border-gray-300">
//         <img src={logo} alt="AngelWatch Logo" className="h-14" />
//         <h1 className="text-lg font-bold text-gray-900">Welcome</h1>
//       </div>

//       {/* Illustration Section */}
//       <div className="flex flex-col items-center space-y-4">
//         <img src={Login} alt="Illustration" className="h-64 object-contain rounded-lg" />
//         <h2 className="text-xl font-bold text-gray-900">AngelWatch</h2>
//         <p className="text-sm text-gray-600 text-center">
//           Your companion for safety and emergency assistance.
//         </p>
//       </div>

//       {/* Buttons Section */}
//       <div className="w-full flex flex-col space-y-4">
//         <button onClick={() => navigate("/loginPage")} className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 transition duration-200">
//           Login
//         </button>
//         <button onClick={() => navigate("/signUp")} className="w-full bg-gray-100 text-blue-600 py-3 rounded-lg font-medium shadow-md hover:bg-gray-200 transition duration-200">
//           Sign Up
//         </button>

//         {/* Google Login Button */}
//         <button onClick={handleGoogleSignIn} className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 transition duration-200">
//           Login with Google
//         </button>
//       </div>

//       {/* Footer Section */}
//       <div className="w-full py-4 border-t border-gray-300 text-center text-xs text-gray-500">
//         Â© {new Date().getFullYear()} AngelWatch. All rights reserved.
//       </div>
//     </div>
//   );
// }

// export default AccountPage;














// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
// import { app } from "../firebase"; // Import the initialized Firebase app
// import logo from "../assets/logo.png";
// import Login from "../assets/Login.png";

// const auth = getAuth(app); // Initialize auth with the Firebase app
// const googleProvider = new GoogleAuthProvider();

// function AccountPage() {
//   const navigate = useNavigate();

//   // Handle the redirect result for Google login
//   React.useEffect(() => {
//     getRedirectResult(auth)
//       .then((result) => {
//         if (result && result.user) {
//           console.log("User signed in:", result.user);
//           // Navigate to the homeMain page or dashboard upon successful login
//           navigate("/homeMain");
//         }
//       })
//       .catch((error) => {
//         console.error("Error handling redirect result:", error);
//       });
//   }, [navigate]);

//   // Handle Google login via redirect
//   const handleGoogleLogin = () => {
//     signInWithRedirect(auth, googleProvider);
//   };

//   return (
//     <div className="flex flex-col items-center justify-between min-h-screen bg-white p-6 text-gray-800">
//       {/* Header Section */}
//       <div className="w-full flex justify-between items-center py-4 border-b border-gray-300">
//         <img src={logo} alt="AngelWatch Logo" className="h-14" />
//         <h1 className="text-lg font-bold text-gray-900">Welcome</h1>
//       </div>

//       {/* Illustration Section */}
//       <div className="flex flex-col items-center space-y-4">
//         <img
//           src={Login}
//           alt="Illustration"
//           className="h-64 object-contain rounded-lg"
//         />
//         <h2 className="text-xl font-bold text-gray-900">AngelWatch</h2>
//         <p className="text-sm text-gray-600 text-center">
//           Your companion for safety and emergency assistance.
//         </p>
//       </div>

//       {/* Buttons Section */}
//       <div className="w-full flex flex-col space-y-4">
//         <button
//           onClick={() => navigate("/loginPage")}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 transition duration-200"
//         >
//           Login
//         </button>
//         <button
//           onClick={() => navigate("/signUp")}
//           className="w-full bg-gray-100 text-blue-600 py-3 rounded-lg font-medium shadow-md hover:bg-gray-200 transition duration-200"
//         >
//           Sign Up
//         </button>

//         {/* Google Login Button */}
//         <button
//           onClick={handleGoogleLogin}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 transition duration-200"
//         >
//           Login with Google
//         </button>
//       </div>

//       {/* Footer Section */}
//       <div className="w-full py-4 border-t border-gray-300 text-center text-xs text-gray-500">
//         Â© {new Date().getFullYear()} AngelWatch. All rights reserved.
//       </div>
//     </div>
//   );
// }

// export default AccountPage;




// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
// import { app } from "../firebase"; // Import the initialized Firebase app
// import logo from "../assets/logo.png";
// import Login from "../assets/Login.png";

// const auth = getAuth(app); // Initialize auth with the Firebase app
// const googleProvider = new GoogleAuthProvider();

// function AccountPage() {
//   const navigate = useNavigate();

//   // Handle the redirect result for Google login
//   React.useEffect(() => {
//     getRedirectResult(auth)
//       .then((result) => {
//         if (result) {
//           console.log("User signed in:", result.user);
//           // Navigate to the homeMain page after successful login
//           navigate("/homeMain"); // Updated to navigate to homeMain
//         }
//       })
//       .catch((error) => {
//         console.error("Error handling redirect result:", error);
//       });
//   }, [navigate]);

//   // Handle Google login via redirect
//   const handleGoogleLogin = () => {
//     signInWithRedirect(auth, googleProvider);
//   };

//   return (
//     <div className="flex flex-col items-center justify-between min-h-screen bg-white p-6 text-gray-800">
//       {/* Header Section */}
//       <div className="w-full flex justify-between items-center py-4 border-b border-gray-300">
//         <img src={logo} alt="AngelWatch Logo" className="h-14" />
//         <h1 className="text-lg font-bold text-gray-900">Welcome</h1>
//       </div>

//       {/* Illustration Section */}
//       <div className="flex flex-col items-center space-y-4">
//         <img
//           src={Login}
//           alt="Illustration"
//           className="h-64 object-contain rounded-lg"
//         />
//         <h2 className="text-xl font-bold text-gray-900">AngelWatch</h2>
//         <p className="text-sm text-gray-600 text-center">
//           Your companion for safety and emergency assistance.
//         </p>
//       </div>

//       {/* Buttons Section */}
//       <div className="w-full flex flex-col space-y-4">
//         <button
//           onClick={() => navigate("/loginPage")}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 transition duration-200"
//         >
//           Login
//         </button>
//         <button
//           onClick={() => navigate("/signUp")}
//           className="w-full bg-gray-100 text-blue-600 py-3 rounded-lg font-medium shadow-md hover:bg-gray-200 transition duration-200"
//         >
//           Sign Up
//         </button>

//         {/* Google Login Button */}
//         <button
//           onClick={handleGoogleLogin}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 transition duration-200"
//         >
//           Login with Google
//         </button>
//       </div>

//       {/* Footer Section */}
//       <div className="w-full py-4 border-t border-gray-300 text-center text-xs text-gray-500">
//         Â© {new Date().getFullYear()} AngelWatch. All rights reserved.
//       </div>
//     </div>
//   );
// }

// export default AccountPage;
