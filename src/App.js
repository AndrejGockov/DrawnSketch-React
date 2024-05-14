import React from "react";
import { Route, Routes } from "react-router-dom";

//Pages
import Home from "./pages/Home.js";
import Paint from "./pages/Paint.js";
import Settings from "./pages/Settings.js";
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/paint" element={<Paint />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
