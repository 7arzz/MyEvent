import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Envelope from "../components/Envelope";
import ThemeToggle from "../components/ThemeToggle";
import Hero from "../components/Hero";
import Countdown from "../components/Countdown";
import EventInfo from "../components/EventInfo";
import Timeline from "../components/Timeline";
import Map from "../components/Map";
import Footer from "../components/Footer";

const Home = ({ data }) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="app-container">
      <AnimatePresence>
        {!opened && (
          <Envelope 
            onOpen={() => setOpened(true)} 
            title={data.hero.title} 
            subtitle={data.hero.subtitle}
          />
        )}
      </AnimatePresence>
      
      {opened && (
        <React.Fragment>
      <ThemeToggle />

      <Hero
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        imageUrl={data.hero.imageUrl}
      />

      <Countdown targetDate={data.targetDate} />

      <EventInfo eventData={data.event} />

      <Timeline agenda={data.agenda} />

      <Map location={data.location} />



      <Footer contact={data.contact} />

        </React.Fragment>
      )}

      <style>
        {`
          .app-container {
            max-width: 100vw;
            overflow-x: hidden;
            background-color: var(--bg);
          }
        `}
      </style>
    </div>
  );
};

export default Home;
