import React, { useState, useRef, useEffect } from "react";
import Header from "./Header.jsx";
import Greetings from "./Greetings.jsx";
import Flowchart from "./Flowchart.jsx";
import Papers from "./Papers.jsx";
import Roadmap from "./Roadmap.jsx";
import About from "./About.jsx";
import Footer from "./Footer.jsx";
import Dashboard from "./Dashboard.jsx";

function LandingPage() {
  const [selectedSection, setSelectedSection] = useState("home");
  const [account, setAccount] = useState(null);

  // Refs for the sections
  const homeRef = useRef(null);
  const papersRef = useRef(null);
  const roadmapRef = useRef(null);
  const dashboardRef = useRef(null);

  // Smooth scroll to the selected section
  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Function to connect Phantom wallet
  const connectWallet = async () => {
    try {
      const { solana } = window;
      if (solana && solana.isPhantom) {
        const response = await solana.connect();
        setAccount(response.publicKey.toString());
        sessionStorage.setItem("phantomAccount", response.publicKey.toString());
      } else {
        alert("Phantom Wallet not found! Please install it.");
      }
    } catch (err) {
      console.error("Error connecting to wallet:", err);
    }
  };

  useEffect(() => {
    const storedAccount = sessionStorage.getItem("phantomAccount");
    if (storedAccount) {
      setAccount(storedAccount); // Set account from sessionStorage if it exists
    }
  }, []);

  // Scroll to the "home" section when selectedSection changes to "home"
  useEffect(() => {
    if (selectedSection === "home") {
      scrollToSection(homeRef);
    } else if (selectedSection === "dashboard") {
      scrollToSection(dashboardRef);
    } else if (selectedSection === "papers") {
      scrollToSection(papersRef);
    } else if (selectedSection === "roadmap") {
      scrollToSection(roadmapRef);
    } else if (selectedSection === "connectWallet") {
      scrollToSection(homeRef);
      setSelectedSection("home");
      connectWallet();
    } else if (selectedSection === "signout") {
      //signout from phantom wallet
      sessionStorage.removeItem("phantomAccount");
      sessionStorage.removeItem(
        "phantom.contentScript.providerInjectionOptions.v3"
      );
      setAccount(null);
    }
  }, [selectedSection]);

  return (
    <div>
      <div ref={homeRef}>
        <Header
          selected={selectedSection}
          setSelected={setSelectedSection}
          account={account}
        />
      </div>

      <Greetings setSelected={setSelectedSection} />

      <About />

      <Flowchart />

      <div ref={dashboardRef}>
        <Dashboard account={account} />
      </div>

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
