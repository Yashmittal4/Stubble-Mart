import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';

import "./App.css";
import About from './pages/About';
import Services from './pages/Services';
import Collaborate from './pages/Collaborate';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
        
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="collab" element={<Collaborate />} />
          
       
        </Route>
          {/* <Route path="admin" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

