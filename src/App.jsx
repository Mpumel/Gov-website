import { useState } from "react";
import NewsSection from "./News.jsx";
import Landing from "./Landing.jsx";
import Header from "./Header.jsx";
import ServicesSection from "./ServicesSection.jsx";
import "./App.css";
import EventsSection from "./eventSection.jsx";
import TourDurban from "./tourSection.jsx";
import Footer from "./footer.jsx";

function App() {
  return (
    <>
      <Header />
      <Landing />
      <NewsSection />
      <ServicesSection />
      <EventsSection />
      <TourDurban />
      <Footer />
    </>
  );
}

export default App;
