import React from "react";
import { Grid, Icon, Segment } from "semantic-ui-react";

function Dashboard({ account }) {
  const shortenAccount = (account) => {
    if (!account) return ""; // Return an empty string if no account is available
    return `${account.slice(0, 5)}...${account.slice(-5)}`; // Format as XXX...YYY
  };

  return (
    <div
      style={{ backgroundColor: "#12385f", padding: "1%", overflow: "hidden" }}
    >
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
        <p
          style={{
            color: "white",
            fontSize: "1.0rem",
            fontFamily: "Orbitron, sans-serif",
            display: "inline-flex",
            justifyContent: "flex-end",
          }}
        >
          {shortenAccount(account)}
          <Icon
            style={{
              cursor: "pointer",
              marginLeft: "0.5rem",
            }}
            name="copy outline"
          />
        </p>
      </div>

      <div style={{ marginLeft: "2%", marginRight: "2%", marginTop: "2%" }}>
        <Segment></Segment>
      </div>
    </div>
  );
}

export default Dashboard;
