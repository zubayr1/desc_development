import React from "react";
import { Grid, Image } from "semantic-ui-react";
import flowchart from "../assets/flowchart.png";

function Flowchart() {
  return (
    <div style={{ overflow: "hidden" }}>
      <Grid>
        <Grid.Row only="computer">
          <Grid.Column
            width={6}
            style={{
              display: "flex",
              alignItems: "center",
              height: "100vh",
              backgroundColor: "#000c14",
            }}
          >
            <div
              style={{
                backgroundColor: "#000c14",
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  color: "white",
                  fontSize: "2rem", // Increased font size
                  fontFamily: "Orbitron, sans-serif", // Ensure the same font
                  textAlign: "center", // Center text for better alignment
                }}
              >
                Collaboration Flowchart
              </p>
            </div>
          </Grid.Column>

          <Grid.Column
            width={10}
            style={{ display: "flex", alignItems: "center", height: "100vh" }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image src={flowchart} size="massive" />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row only="mobile tablet">
          <Grid>
            <Grid.Row>
              <div
                style={{
                  backgroundColor: "#000c14",
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    color: "white",
                    fontSize: "1.5rem", // Increased font size
                    fontFamily: "Orbitron, sans-serif", // Ensure the same font
                    textAlign: "center", // Center text for better alignment
                    marginTop: "2%",
                  }}
                >
                  Collaboration Flowchart
                </p>
              </div>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={14}>
                <Image src={flowchart} size="massive" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Flowchart;
