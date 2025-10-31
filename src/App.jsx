
// import from 'react'; // Explicitly import React
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router/AppRouter.jsx";

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;



// import React from 'react';
// import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
// import AppRouter from './router/AppRouter'; // Assuming AppRouter manages your routes

// const App = () => {
//   return (
//     <BrowserRouter> {/* Wrap your app with BrowserRouter */}
//       <AppRouter />
//     </BrowserRouter>
//   );
// };

// export default App;
