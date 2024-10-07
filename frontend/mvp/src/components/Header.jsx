import React from "react";
import { Dropdown, Grid, Image } from "semantic-ui-react";

import logo from "../assets/logo.svg";

function Header({ selected, setSelected, account }) {
  // Function to dynamically apply the color based on the selected section
  const getColor = (section) => (selected === section ? "#12606c" : "white");

  const dropdownOptions = account
    ? [
        { key: "home", text: "Home", value: "home" },
        { key: "dashboard", text: "Dashboard", value: "dashboard" },
        { key: "papers", text: "Papers", value: "papers" },
        { key: "roadmap", text: "Roadmap", value: "roadmap" },
        { key: "signout", text: "Sign Out", value: "signout" },
      ]
    : [
        { key: "home", text: "Home", value: "home" },
        { key: "dashboard", text: "Dashboard", value: "dashboard" },
        { key: "papers", text: "Papers", value: "papers" },
        { key: "roadmap", text: "Roadmap", value: "roadmap" },
        {
          key: "connectWallet",
          text: "Connect Wallet",
          value: "connectWallet",
        },
      ];

  const handleDropdownChange = (e, { value }) => setSelected(value);

  return (
    <div
      style={{
        backgroundColor: "#000c14",
        paddingLeft: "5%",
        paddingRight: "5%",
        fontFamily: "'Orbitron', sans-serif",
      }}
    >
      <Grid verticalAlign="middle">
        <Grid.Row only="computer">
          <Grid.Column width={4}>
            <Image src={logo} size="small" />
          </Grid.Column>

          <Grid.Column width={12}>
            <Grid>
              <Grid.Column width={3}>
                <p
                  style={{
                    color: getColor("home"),
                    cursor: "pointer",
                    fontSize: "1.0rem",
                  }}
                  onClick={() => setSelected("home")}
                >
                  Home
                </p>
              </Grid.Column>

              <Grid.Column width={3}>
                <p
                  style={{
                    color: getColor("dashboard"),
                    cursor: "pointer",
                    fontSize: "1.0rem",
                  }}
                  onClick={() => setSelected("dashboard")}
                >
                  Dashboard
                </p>
              </Grid.Column>

              <Grid.Column width={3}>
                <p
                  style={{
                    color: getColor("papers"),
                    cursor: "pointer",
                    fontSize: "1.0rem",
                  }}
                  onClick={() => setSelected("papers")}
                >
                  Papers
                </p>
              </Grid.Column>

              <Grid.Column width={3}>
                <p
                  style={{
                    color: getColor("roadmap"),
                    cursor: "pointer",
                    fontSize: "1.0rem",
                  }}
                  onClick={() => setSelected("roadmap")}
                >
                  Roadmap
                </p>
              </Grid.Column>

              <Grid.Column width={3}>
                {account !== null ? (
                  <p
                    style={{
                      color: getColor("connect"),
                      cursor: "pointer",
                      fontSize: "1.0rem",
                    }}
                    onClick={() => setSelected("signout")} // Trigger signout when clicked
                  >
                    Sign Out
                  </p>
                ) : (
                  <p
                    style={{
                      color: getColor("connect"),
                      cursor: "pointer",
                      fontSize: "1.0rem",
                    }}
                    onClick={() => setSelected("connectWallet")} // Trigger wallet connection when clicked
                  >
                    Connect Wallet
                  </p>
                )}
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row only="tablet mobile">
          <Grid.Column width={4}>
            <Image src={logo} size="small" />
          </Grid.Column>

          <Grid.Column width={12} textAlign="right" floated="right">
            <Dropdown
              selection
              width={20}
              options={dropdownOptions}
              defaultValue="Home"
              onChange={handleDropdownChange}
              style={{
                backgroundColor: "#0012606c",
                color: "white",
              }}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Header;
