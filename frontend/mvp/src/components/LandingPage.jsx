import React, { useState, useRef, useEffect } from "react";
import Header from "./Header.jsx";
import Greetings from "./Greetings.jsx";
import Flowchart from "./Flowchart.jsx";
import Papers from "./Papers.jsx";
import Roadmap from "./Roadmap.jsx";
import About from "./About.jsx";
import Footer from "./Footer.jsx";

function LandingPage() {
  const [selectedSection, setSelectedSection] = useState("home");

  // Refs for the sections
  const homeRef = useRef(null);
  const papersRef = useRef(null);
  const roadmapRef = useRef(null);

  // Smooth scroll to the selected section
  const scrollToSection = (sectionRef) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to the "home" section when selectedSection changes to "home"
  useEffect(() => {
    if (selectedSection === "home") {
      scrollToSection(homeRef);
    } else if (selectedSection === "papers") {
      scrollToSection(papersRef);
    } else if (selectedSection === "roadmap") {
      scrollToSection(roadmapRef);
    } else if (selectedSection === "connectWallet") {
      scrollToSection(homeRef);
      setSelectedSection("home");
    }
  }, [selectedSection]);

  return (
    <div>
      <div ref={homeRef}>
        <Header selected={selectedSection} setSelected={setSelectedSection} />
      </div>

      <Greetings />

      <About />

      <Flowchart />

      <div ref={papersRef}>
        <Papers />
      </div>

      <div ref={roadmapRef}>
        <Roadmap />
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;
