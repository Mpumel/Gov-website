import { useState } from "react";
import NewsSection from "./News.jsx";
import Landing from "./Landing.jsx";
import Header from "./Header.jsx";
import ServicesSection from "./ServicesSection.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Landing />
      <NewsSection />
      <ServicesSection />
    </>
  );
}

export default App;
