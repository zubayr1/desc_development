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
                communication and collaboration between parties. Its fundamental
                feature is an encrypted messaging system, used for discussions
                between initiators and acceptors in a collaboration process. The
                entire collaboration process is divided into multiple 'atomic
                levels' with the help of Artificial Intelligence. A moderator
                set from a moderator universe is selected where each subset of
                moderators only overlooks one atomic level, thus ensuring the
                privacy, transparency, and decentralised properties. This
                technique is used in Blockchain first time ever according to our
                knowledge. While the messaging aspect is centralized, the final
                agreements are signed and stored on-chain, ensuring transparency
                and immutability. DeSC also caches collaboration data for easy
                access and reference during communication, creating a smooth
                flow of information. The project aims to blend the convenience
                of centralized communication with the security and trustlessness
                of blockchain technology. The myriad usecases include from
                collaboration for tangible assets (e.g., supply chain) and
                digital assets (e.g., transfering NFTs) to collaboration for
                abstract assets (e.g., social media collaboration, freelance
                technical product development collaboration, etc.).
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
                communication and collaboration between parties. Its fundamental
                feature is an encrypted messaging system, used for discussions
                between initiators and acceptors in a collaboration process. The
                entire collaboration process is divided into multiple 'atomic
                levels' with the help of Artificial Intelligence. A moderator
                set from a moderator universe is selected where each subset of
                moderators only overlooks one atomic level, thus ensuring the
                privacy, transparency, and decentralised properties. This
                technique is used in Blockchain first time ever according to our
                knowledge. While the messaging aspect is centralized, the final
                agreements are signed and stored on-chain, ensuring transparency
                and immutability. DeSC also caches collaboration data for easy
                access and reference during communication, creating a smooth
                flow of information. The project aims to blend the convenience
                of centralized communication with the security and trustlessness
                of blockchain technology. The myriad usecases include from
                collaboration for tangible assets (e.g., supply chain) and
                digital assets (e.g., transfering NFTs) to collaboration for
                abstract assets (e.g., social media collaboration, freelance
                technical product development collaboration, etc.).
              </p>
            </Grid.Row>
          </Grid>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default About;
