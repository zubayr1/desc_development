import React, { useState } from "react";
import {
  Grid,
  Icon,
  Segment,
  MenuMenu,
  MenuItem,
  Menu,
  Button,
  Modal,
} from "semantic-ui-react";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EntitySet from "./EntitySet";

function Dashboard({ account, publicKey }) {
  const [activeItem, setActiveItem] = useState("Initiator Set");
  const [openModal, setOpenModal] = useState(false);

  const shortenAccount = (account) => {
    if (!account) return ""; // Return an empty string if no account is available
    return `${account.slice(0, 5)}...${account.slice(-5)}`; // Format as XXX...YYY
  };

  const notify = (message) => toast(message);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        notify("Copied to clipboard!");
      },
      (err) => {
        notify("Could not copy to clipboard!");
      }
    );
  };

  const generateRandomCollabId = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  const handleDefiningRole = async (role) => {
    const walletAddress = account;

    const collabId = generateRandomCollabId();

    try {
      const response = await axios.post("http://127.0.0.1:5000/store_collab", {
        wallet_address: walletAddress,
        collabId: collabId,
        string: role,
      });

      // Handle the success response
      if (response.status === 200) {
        // const { message, collabId, wallet_address, public_key } = response.data;

        toast("Collaboration role defined successfully!");
      } else {
        toast("Error: " + response.data.error);
      }
    } catch (error) {
      // Handle the error
      toast("Failed to define collaboration role.");
    }
    setOpenModal(false);
  };

  return (
    <div
      style={{ backgroundColor: "#12385f", padding: "1%", overflow: "hidden" }}
    >
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
      <Grid centered>
        <Grid.Row only="computer tablet">
          <Grid.Row>
            <p
              style={{
                color: "white",
                fontSize: "3.5rem",
                fontFamily: "Orbitron, sans-serif",
                textAlign: "center",
              }}
            >
              Dashboard
            </p>
          </Grid.Row>
        </Grid.Row>

        <Grid.Row only="mobile">
          <Grid.Row>
            <p
              style={{
                color: "white",
                fontSize: "1.5rem",
                fontFamily: "Orbitron, sans-serif",
                textAlign: "center",
                marginTop: "2%",
              }}
            >
              Dashboard
            </p>
          </Grid.Row>
        </Grid.Row>
      </Grid>

      <div style={{ textAlign: "right", marginRight: "2%" }}>
        {account !== null ? (
          <p
            style={{
              color: "white",
              fontSize: "1.0rem",
              fontFamily: "Orbitron, sans-serif",
              display: "inline-flex",
              justifyContent: "flex-end",
              cursor: "pointer",
            }}
            onClick={() => copyToClipboard(account)}
          >
            {shortenAccount(account)}
            <Icon
              style={{
                marginLeft: "0.5rem",
              }}
              name="copy outline"
            />
          </p>
        ) : (
          <div></div>
        )}
      </div>

      <div style={{ marginLeft: "2%", marginRight: "2%", marginTop: "2%" }}>
        <Segment>
          <Grid>
            <Grid.Row only="computer tablet">
              <Grid.Column width={16}>
                <Menu pointing color="blue">
                  <MenuItem
                    name="Initiator Set"
                    active={activeItem === "Initiator Set"}
                    onClick={() => setActiveItem("Initiator Set")}
                  />
                  <MenuItem
                    name="Acceptor Set"
                    active={activeItem === "Acceptor Set"}
                    onClick={() => setActiveItem("Acceptor Set")}
                  />

                  <MenuItem
                    name="Moderator Set"
                    active={activeItem === "Moderator Set"}
                    onClick={() => setActiveItem("Moderator Set")}
                  />

                  <MenuMenu position="right">
                    <MenuItem>
                      <Button onClick={() => setOpenModal(true)}>
                        Join as Initiator or Acceptor
                      </Button>
                    </MenuItem>
                  </MenuMenu>
                </Menu>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row only="mobile" centered>
              <Menu pointing color="blue">
                <MenuItem
                  name="Initiator Set"
                  active={activeItem === "Initiator Set"}
                  onClick={() => setActiveItem("Initiator Set")}
                />
                <MenuItem
                  name="Acceptor Set"
                  active={activeItem === "Acceptor Set"}
                  onClick={() => setActiveItem("Acceptor Set")}
                />

                <MenuItem
                  name="Moderator Set"
                  active={activeItem === "Moderator Set"}
                  onClick={() => setActiveItem("Moderator Set")}
                />
              </Menu>

              <Button onClick={() => setOpenModal(true)}>
                Join as Initiator or Acceptor
              </Button>
            </Grid.Row>
          </Grid>

          <EntitySet entityType={activeItem} />
        </Segment>
      </div>

      {/* Modal Component */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeOnDimmerClick={false} // Prevent closing when clicking outside
        closeOnEscape={false} // Prevent closing with the Escape key
      >
        <Modal.Header style={{ backgroundColor: "#000c14", color: "white" }}>
          Join as Initiator or Acceptor
          <Icon
            name="close"
            inverted
            style={{ cursor: "pointer", float: "right" }}
            onClick={() => setOpenModal(false)} // Close modal on clicking X
          />
        </Modal.Header>
        <Modal.Content>
          {account !== null ? (
            <div>
              <Grid centered>
                <Grid.Row>
                  <p style={{ fontFamily: "Orbitron" }}>
                    Select your role to proceed.
                  </p>
                </Grid.Row>

                <Grid.Row>
                  <p style={{ fontFamily: "Orbitron" }}>
                    PublicKey: {shortenAccount(publicKey)}
                  </p>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column width={8}>
                    <Button
                      fluid
                      style={{ backgroundColor: "#011720", color: "white" }}
                      onClick={() => handleDefiningRole("initiator")}
                    >
                      Initiator
                    </Button>
                  </Grid.Column>

                  <Grid.Column width={8}>
                    <Button
                      fluid
                      style={{ backgroundColor: "#12385f", color: "white" }}
                      onClick={() => handleDefiningRole("acceptor")}
                    >
                      Acceptor
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          ) : (
            <div>
              <p>You need to connect to Phantom wallet to proceed</p>
            </div>
          )}
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default Dashboard;
