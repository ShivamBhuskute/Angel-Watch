





// import { useState } from "react";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { app } from "../firebase"; // Correctly imports the default export
// import NavBar from "./Navbar";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// const auth = getAuth(app);

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(""); // For error handling
//   const [loading, setLoading] = useState(false); // To show a loading indicator
//   const navigate = useNavigate(); // Initialize useNavigate

//   const createUser = async () => {
//     if (!email || !password) {
//       setError("Please fill in both fields.");
//       return;
//     }
//     setError(""); // Reset error before trying
//     setLoading(true); // Set loading to true while making the request

//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       setLoading(false);
//       console.log("User created successfully");
//       navigate("/homeMain"); // Navigate to /homeMain after successful sign-up
//     } catch (err) {
//       setLoading(false);
//       setError(err.message); // Set the error message if the signup fails
//       console.error("Error creating user:", err.message);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <NavBar />
//       </div>
//       <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-800 p-6">
//         <h2 className="text-3xl font-bold mb-4 text-pink-600">Sign Up</h2>
//         <div className="w-full max-w-sm">
//           <input
//             type="email"
//             value={email}
//             placeholder="Email"
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//           />
//           <input
//             type="password"
//             value={password}
//             placeholder="Password"
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//           />

//           {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

//           <button
//             onClick={createUser}
//             disabled={loading} // Disable button while loading
//             className={`w-full p-3 rounded-md text-white font-semibold ${loading ? 'bg-gray-400' : 'bg-pink-600 hover:bg-pink-700'} transition-all`}
//           >
//             {loading ? "Signing Up..." : "Sign Up"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;



import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase"; // Correctly imports the default export
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FiEye, FiEyeOff } from "react-icons/fi"; // For the show/hide password icon

const auth = getAuth(app);

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // For error handling
  const [loading, setLoading] = useState(false); // To show a loading indicator
  const [passwordVisible, setPasswordVisible] = useState(false); // For toggling password visibility
  const [passwordStrength, setPasswordStrength] = useState(""); // To show password strength
  const [termsAccepted, setTermsAccepted] = useState(false); // To check if terms are accepted
  const navigate = useNavigate(); // Initialize useNavigate

  // Email validation regex
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Password strength logic (simple check)
  const checkPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (password.length < 8) return "Medium";
    return "Strong";
  };

  const createUser = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!termsAccepted) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    setError(""); // Reset error before trying
    setLoading(true); // Set loading to true while making the request

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      console.log("User created successfully");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTermsAccepted(false);
      navigate("/homeMain"); // Navigate to /homeMain after successful sign-up
    } catch (err) {
      setLoading(false);
      setError(err.message); // Set the error message if the signup fails
      console.error("Error creating user:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6">
      <NavBar />
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-blue-700 text-center mb-6">Sign Up</h2>
        <div className="space-y-6">
          {/* Email Input */}
          <div>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          
          {/* Password Input */}
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordStrength(checkPasswordStrength(e.target.value));
              }}
              className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          {/* Password Strength */}
          <div className="text-sm text-gray-500">
            Password Strength: {passwordStrength}
          </div>

          {/* Confirm Password Input */}
          <div>
            <input
              type={passwordVisible ? "text" : "password"}
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              className="h-5 w-5 text-blue-600"
            />
            <label className="text-sm text-gray-700">I agree to the <a href="/terms" className="text-blue-600 hover:underline">terms and conditions</a></label>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          {/* Submit Button */}
          <button
            onClick={createUser}
            disabled={loading} // Disable button while loading
            className={`w-full p-3 rounded-md text-white font-semibold ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition-all`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
