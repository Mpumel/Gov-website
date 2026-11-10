import { useState } from "react";
import NewsSection from "./News.jsx";
import Landing from "./Landing.jsx";
import ServicesSection from "./ServicesSection.jsx";
import EventsSection from "./eventSection.jsx";
import TourDurban from "./tourSection.jsx";

function Home() {
  return (
    <>
      <Landing />
      <NewsSection />
      <ServicesSection />
      <EventsSection />
      <TourDurban />
    </>
  );
}

export default Home;
