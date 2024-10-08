import React, { useState, useRef, useEffect, useCallback } from "react";
import Header from "./Header.jsx";
import Greetings from "./Greetings.jsx";
import Flowchart from "./Flowchart.jsx";
import Papers from "./Papers.jsx";
import Roadmap from "./Roadmap.jsx";
import About from "./About.jsx";
import Footer from "./Footer.jsx";
import Dashboard from "./Dashboard.jsx";

import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  Segment,
} from "semantic-ui-react";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LandingPage() {
  const [selectedSection, setSelectedSection] = useState("home");
  const [account, setAccount] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Refs for the sections
  const homeRef = useRef(null);
  const papersRef = useRef(null);
  const roadmapRef = useRef(null);
  const dashboardRef = useRef(null);

  const notify = (message) => toast(message);

  // Smooth scroll to the selected section
  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Function to connect Phantom wallet
  const connectWallet = useCallback(async () => {
    try {
      const { solana } = window;
      if (solana && solana.isPhantom) {
        const response = await solana.connect();

        const walletAddress = response.publicKey.toString();

        try {
          const result = await axios.post(
            "http://127.0.0.1:5000/generate_keys",
            {
              wallet_address: walletAddress,
            }
          );

          // Handle success response
          if ("private_key" in result.data) {
            const { private_key, public_key } = result.data;
            setOpenModal(true);
            setPublicKey(public_key);
            setPrivateKey(private_key);
          } else {
            const { public_key, wallet_address } = result.data;

            setPublicKey(public_key);
            setAccount(wallet_address);
          }

          setAccount(walletAddress);
          sessionStorage.setItem("phantomAccount", walletAddress);
        } catch (error) {
          // Handle errors during the axios call
          notify("Error generating keys for wallet.");
        }
      } else {
        notify("Phantom Wallet not found! Please install it.");
      }
    } catch (err) {
      notify("Error connecting to wallet.");
    }
  }, []);

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
  }, [selectedSection, connectWallet]);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <ToastContainer />

      <Modal onOpen={() => setOpenModal(true)} open={openModal}>
        <ModalHeader>Your private key</ModalHeader>
        <ModalContent>
          <ModalDescription>
            <p>Copy Your private key</p>
            <Segment>{privateKey}</Segment>
          </ModalDescription>
        </ModalContent>
        <ModalActions>
          <Button
            content="Done"
            labelPosition="right"
            icon="checkmark"
            onClick={() => setOpenModal(false)}
            positive
          />
        </ModalActions>
      </Modal>

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
        <Dashboard account={account} publicKey={publicKey} />
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
