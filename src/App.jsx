// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './components/Layout';
// import Home from './components/Home';

// import "./App.css";
// import About from './pages/About';
// import Services from './pages/Services';
// import Collaborate from './pages/Collaborate';
// import SignupPage from './components/auth/SignupPage';
// import LoginPage from './components/auth/LoginPage';





// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
          
        
//           <Route path="about" element={<About />} />
//           <Route path="services" element={<Services />} />
//           <Route path="collab" element={<Collaborate />} />
//           <Route path="login" element={<LoginPage />} />
//           <Route path="signup" element={<SignupPage />} />
          
       
//         </Route>
          
//       </Routes>
//     </Router>
//   );
// }

// export default App;




import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./components/Home"
import About from "./pages/About"
import Services from "./pages/Services"
import Collaborate from "./pages/Collaborate"
import SignupPage from "./components/auth/SignupPage"
import LoginPage from "./components/auth/LoginPage"


import "./App.css"
import ProductDetails from "./components/products/ProductDetails"
import Products from "./components/products/Products"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="collab" element={<Collaborate />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<ProductDetails />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

