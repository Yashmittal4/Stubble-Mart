// import React from "react"
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Layout from "./components/Layout"
// import Home from "./components/Home"
// import About from "./pages/About"
// import Services from "./pages/Services"
// import Collaborate from "./pages/Collaborate"
// import SignupPage from "./components/auth/SignupPage"
// import LoginPage from "./components/auth/LoginPage"


// import "./App.css"
// import ProductDetails from "./components/products/ProductDetails"
// import Products from "./components/products/Products"
// import Layouta from "./components/admin/layouta"
// import Dashboard from "./components/admin/Dashboard"
// import FarmersPage from "./components/admin/FarmersPage"
// import ProductsPage from "./components/admin/ProductsPage"
// import RecycleBin from "./components/admin/RecycleBin"
// import CollaboratorType from "./components/admin/CollaboratorType"

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
//           <Route path="products" element={<Products />} />
//           <Route path="products/:productId" element={<ProductDetails />} />
//         </Route>
//         <Route path="/admin" element={<Layouta />}>
//           <Route index element={<Dashboard />} />
//           <Route path="farmers" element={<FarmersPage />} />
//           <Route path="products" element={<ProductsPage />} />
//           <Route path="recycle-bin" element={<RecycleBin />} />
//           <Route path="collaborator/:type" element={<CollaboratorType />} />
//         </Route>
//       </Routes>
//     </Router>
//   )
// }

// export default App



// now its just a simple admi pages without any functionilty i want proper functionilty with all the features 
// this is my collabrators which data is shoewd in stubble purchasing ,machine rental ,transportation, transportation ,agriculture so i want proper dashboard where proper detials is viewd in professional way with advaned level ui matching with this in which there is search option and filter based on mutli things you can cosider through column name dbased on filter throgh collaboration type in this we accept reject view button all working and ddlete button also when and aside special filter also show accepted only and according have all charts for all 4 things and in stubble purchasing detials oage there is special alfo you have to implement multi level feedback queue that stubble purchasing company have extra field that they can add crops and prices and alsoways not to give priority to high paying companies use to implement to give priorroty to other copanies also it gives suggestuin for satubble purchase company only and graphs should be unique for all and should guve insightfull information and when delete record it goes to recylebin,jsx where we can revive it filter that show deleted data of machine rental or stuhbble pourcha=sing company etc everythibg make now this whole admin page fully functional and a advanved do this all in this compponentsonly i will update read each word of each line of my instructuon now send all code 



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
import Layouta from "./components/admin/layouta"
// import Dashboard from "./components/admin/Dashboard"
// import FarmersPage from "./components/admin/FarmersPage"
// import ProductsPage from "./components/admin/ProductsPage"
import RecycleBin from "./components/admin/RecycleBin"
// import CollaboratorType from "./components/admin/CollaboratorType"
// import CollaboratorList from "./components/admin/CollaboratorList"
// import CollaboratorDetails from "./components/admin/CollaboratorDetails"
import AdminDashboard from "./components/admin/AdminDashboard"
import Collaborators from "./components/admin/Collaborators"
import Farmers from "./components/admin/Farmers"
import Productsa from "./components/admin/Products"

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
        <Route path="/admin" element={<Layouta />}>
        <Route index element={<AdminDashboard />} />
          <Route path="collaborators" element={<Collaborators />} />
          <Route path="farmers" element={<Farmers />} />
          <Route path="products" element={<Productsa />} />
          <Route path="recycle-bin" element={<RecycleBin />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
