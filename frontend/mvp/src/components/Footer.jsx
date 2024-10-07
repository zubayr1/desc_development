import React from "react";
import { Grid } from "semantic-ui-react";

function Footer() {
  return (
    <div
      style={{
        backgroundColor: "#12385f",
        padding: "2%",
        overflow: "hidden",
      }}
    >
      <Grid centered>
        <Grid.Row only="computer tablet">
          <p
            style={{
              color: "white",
              fontSize: "1.5rem",
              fontFamily: "Orbitron, sans-serif",
              textAlign: "center",
            }}
          >
            {"\u00A9"} DeSC
          </p>
        </Grid.Row>

        <Grid.Row only="mobile">
          <p
            style={{
              color: "white",
              fontSize: "1.0rem",
              fontFamily: "Orbitron, sans-serif",
              textAlign: "center",
            }}
          >
            {"\u00A9"} DeSC
          </p>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Footer;
