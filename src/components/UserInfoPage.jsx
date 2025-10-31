// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
// import { app } from "../firebase"

// const auth = getAuth(app)

// function UserInfoPage() {
//   const [email, setemail] = useState("")
//   const [password, setpassword] = useState("")

//   const createUser = () => {
//     createUserWithEmailAndPassword(auth, email, password).then(value => alert)("success");
//   }

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-blue-600 text-white">
//       <h2 className="text-2xl mb-4">User Information</h2>
//       <input
//         type="email"
//         name="email"
//         onChange={(e) => setemail(e.target.value)}
//         value={email}
//         placeholder="Enter your email"
//         required
//         className="border-b-2 mb-4 w-3/4 bg-transparent text-white"
//       />
//       <input
//         type="password"
//         name="password"
//         onChange={(e) => setpassword(e.target.value)}
//         value={password}
//         placeholder="Enter your password"
//         required
//         className="border-b-2 mb-4 w-3/4 bg-transparent text-white"
//       />

//       <button 
//       onClick={createUser}
//       className="bg-pink-500 px-6 py-2 rounded-full">
//         SignUp
//       </button>
//     </div>
//   );
// }

// export default UserInfoPage;


import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

function UserInfoPage() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User successfully created
        alert("User created successfully!");
        console.log(userCredential.user); // Optionally log user details
      })
      .catch((error) => {
        // Handle error during user creation
        console.error(error.message);
        alert(`Error: ${error.message}`);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-600 text-white">
      <h2 className="text-2xl mb-4">User Information</h2>
      <input
        type="email"
        name="email"
        onChange={(e) => setemail(e.target.value)}
        value={email}
        placeholder="Enter your email"
        required
        className="border-b-2 mb-4 w-3/4 bg-transparent text-white"
      />
      <input
        type="password"
        name="password"
        onChange={(e) => setpassword(e.target.value)}
        value={password}
        placeholder="Enter your password"
        required
        className="border-b-2 mb-4 w-3/4 bg-transparent text-white"
      />

      <button
        onClick={createUser}
        className="bg-pink-500 px-6 py-2 rounded-full"
      >
        Sign Up
      </button>
    </div>
  );
}

export default UserInfoPage;
