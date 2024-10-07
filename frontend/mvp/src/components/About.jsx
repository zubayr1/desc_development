import React from "react";
import { Grid } from "semantic-ui-react";

function About() {
  return (
    <div
      style={{ backgroundColor: "#12385f", padding: "2%", overflow: "hidden" }}
    >
      <Grid centered>
        <Grid.Row only="computer tablet">
          <Grid centered>
            <Grid.Row>
              <p
                style={{
                  color: "white",
                  fontSize: "3.5rem",
                  fontFamily: "Orbitron, sans-serif",
                  textAlign: "center",
                }}
              >
                About DeSC
              </p>
            </Grid.Row>

            <Grid.Row>
              <p
                style={{
                  color: "white",
                  fontSize: "1.2rem",
                  fontFamily: "Orbitron, sans-serif",
                  textAlign: "center",
                  lineHeight: "2.2",
                  marginLeft: "2%",
                  marginRight: "2%",
                }}
              >
                DeSC is a project focused on enabling secure, encrypted
                communication and collaboration between parties. Its primary
                feature is an encrypted messaging system, used for discussions
                between initiators and acceptors in a collaboration process.
                While the messaging aspect is centralized, the final agreements
                are signed and stored on-chain, ensuring transparency and
                immutability. DeSC also caches collaboration data for easy
                access and reference during communication, creating a smooth
                flow of information. The project aims to blend the convenience
                of centralized communication with the security and trustlessness
                of blockchain technology.
              </p>
            </Grid.Row>
          </Grid>
        </Grid.Row>

        <Grid.Row only="mobile">
          <Grid centered>
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
                About DeSC
              </p>
            </Grid.Row>

            <Grid.Row>
              <p
                style={{
                  color: "white",
                  fontSize: "1.0rem",
                  fontFamily: "Orbitron, sans-serif",
                  textAlign: "center",
                  paddingLeft: "5%",
                  paddingRight: "5%",
                  marginTop: "-2%",
                }}
              >
                DeSC is a project focused on enabling secure, encrypted
                communication and collaboration between parties. Its primary
                feature is an encrypted messaging system, used for discussions
                between initiators and acceptors in a collaboration process.
                While the messaging aspect is centralized, the final agreements
                are signed and stored on-chain, ensuring transparency and
                immutability. DeSC also caches collaboration data for easy
                access and reference during communication, creating a smooth
                flow of information. The project aims to blend the convenience
                of centralized communication with the security and trustlessness
                of blockchain technology.
              </p>
            </Grid.Row>
          </Grid>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default About;
