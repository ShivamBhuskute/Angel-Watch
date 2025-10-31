// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { app } from "../firebase";
// const auth = getAuth(app);

// function LoginPage() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const signinUser = () => {
//     if (!email || !password) {
//       setErrorMessage("Please enter both email and password.");
//       return;
//     }
//     setErrorMessage(""); // Reset error message
//     setLoading(true); // Show loading spinner

//     signInWithEmailAndPassword(auth, email, password)
//       .then((value) => {
//         console.log("Signin Successful", value);
//         navigate("/homeMain"); // Navigate to homeMain after successful login
//       })
//       .catch((err) => {
//         console.error("Error during sign-in:", err.message);
//         setErrorMessage(`Login failed: ${err.message}`);
//       })
//       .finally(() => {
//         setLoading(false); // Hide loading spinner
//       });
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-blue-600 text-white">
//       <h2 className="text-2xl mb-4">Login</h2>
//       <form
//         className="flex flex-col items-center w-3/4"
//         onSubmit={(e) => {
//           e.preventDefault();
//           signinUser();
//         }}
//       >
//         <input
//           type="email"
//           name="email"
//           onChange={(e) => setEmail(e.target.value)}
//           value={email}
//           placeholder="Email"
//           className="border-b-2 mb-4 bg-transparent text-white"
//         />
//         <input
//           type="password"
//           name="password"
//           onChange={(e) => setPassword(e.target.value)}
//           value={password}
//           placeholder="Password"
//           className="border-b-2 mb-4 bg-transparent text-white"
//         />
//         {errorMessage && (
//           <p className="text-red-500 text-xs mb-4">{errorMessage}</p>
//         )}
//         <button
//           type="submit"
//           className="bg-pink-500 px-6 py-2 rounded-full"
//           disabled={loading} // Disable the button when loading
//         >
//           {loading ? "Loading..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default LoginPage;



// main code

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { app } from "../firebase";
// // import App.css from "."


// const auth = getAuth(app);

// function LoginPage() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const signinUser = () => {
//     if (!email || !password) {
//       setErrorMessage("Please enter both email and password.");
//       return;
//     }
//     setErrorMessage(""); // Reset error message
//     setLoading(true); // Show loading spinner

//     signInWithEmailAndPassword(auth, email, password)
//       .then((value) => {
//         console.log("Signin Successful", value);
//         navigate("/homeMain"); // Navigate to homeMain after successful login
//       })
//       .catch((err) => {
//         console.error("Error during sign-in:", err.message);
//         setErrorMessage(`Login failed: ${err.message}`);
//       })
//       .finally(() => {
//         setLoading(false); // Hide loading spinner
//       });
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-blue-600 text-white px-4">
//       <h2 className="text-3xl font-semibold mb-6">Login</h2>
//       <form
//         className="flex flex-col items-center w-full max-w-md"
//         onSubmit={(e) => {
//           e.preventDefault();
//           signinUser();
//         }}
//       >
//         <input
//           type="email"
//           name="email"
//           onChange={(e) => setEmail(e.target.value)}
//           value={email}
//           placeholder="Email"
//           className="border-b-2 mb-4 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-pink-500 px-3 py-2 w-full"
//         />
//         <input
//           type="password"
//           name="password"
//           onChange={(e) => setPassword(e.target.value)}
//           value={password}
//           placeholder="Password"
//           className="border-b-2 mb-4 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-pink-500 px-3 py-2 w-full"
//         />
//         {errorMessage && (
//           <p className="text-red-500 text-xs mb-4">{errorMessage}</p>
//         )}
//         <button
//           type="submit"
//           className="bg-pink-500 px-8 py-3 rounded-full text-white font-semibold shadow-md w-full hover:bg-pink-600 transition-all"
//           disabled={loading} // Disable the button when loading
//         >
//           {loading ? (
//             <span className="loader"></span> // This will show the spinner
//           ) : (
//             "Login"
//           )}
//         </button>

//       </form>
//       <p className="mt-4 text-white text-sm">
//         Don't have an account?{" "}
//         <span
//           onClick={() => navigate("/signUp")}
//           className="text-pink-300 cursor-pointer hover:underline"
//         >
//           Sign up
//         </span>
//       </p>
//     </div>
//   );
// }

// export default LoginPage;






import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { FiMail, FiLock } from "react-icons/fi"; // Icons for Email and Password
import NavBar from "./Navbar";

const auth = getAuth(app);

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  

  const signinUser = () => {
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
    setErrorMessage(""); // Reset error message
    setLoading(true); // Show loading spinner

    signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        console.log("Signin Successful", value);
        navigate("/homeMain"); // Navigate to homeMain after successful login
      })
      .catch((err) => {
        console.error("Error during sign-in:", err.message);
        setErrorMessage(`Login failed: ${err.message}`);
      })
      .finally(() => {
        setLoading(false); // Hide loading spinner
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
          <NavBar />

      {/* App Title */}
      <h2 className="text-4xl font-bold text-blue-600 mb-6 animate-bounce">
        Welcome Back!
      </h2>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Login to Your Account
        </h3>
        <form
          className="flex flex-col items-center w-full"
          onSubmit={(e) => {
            e.preventDefault();
            signinUser();
          }}
        >
          {/* Email Input */}
          <div className="relative w-full mb-4">
            <FiMail className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              className="w-full border border-gray-300 rounded-full pl-10 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="relative w-full mb-4">
            <FiLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-full pl-10 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-full font-semibold shadow-md transition-all ${
              loading
                ? "bg-blue-400 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            disabled={loading} // Disable the button when loading
          >
            {loading ? (
              <div className="loader" style={{ margin: "0 auto" }}></div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Redirect to Sign Up */}
        <p className="mt-6 text-gray-600 text-center text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signUp")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;