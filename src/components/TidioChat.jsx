// import React, { useEffect } from "react";

// const TidioChat = () => {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "//code.tidio.co/b6fynqmupat2m7is6nduknajj5mzwebo.js";
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script); // Cleanup the script when the component unmounts
//     };
//   }, []);

//   return (
//     <div
//       className="fixed bottom-28 right-4 z-50"
//       style={{ width: "72px", height: "72px" }}
//     >
//       {/* The actual chatbot widget will load here */}
//     </div>
//   );
// };



import React, { useEffect } from "react";

const TidioChat = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//code.tidio.co/b6fynqmupat2m7is6nduknajj5mzwebo.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <style>
        {`
          #tidio-chat {
            position: fixed !important;
            bottom: 0px !important; /* 20 pixels above the bottom */
            right: 20px !important; /* 20 pixels from the right edge */
            z-index: 1000 !important; /* Ensure it's above other elements */
          }
        `}
      </style>
      <div id="tidio-chat"></div>
    </>
  );
};


export default TidioChat;