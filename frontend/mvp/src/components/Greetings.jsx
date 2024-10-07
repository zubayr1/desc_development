import React from "react";
import { Grid, Button } from "semantic-ui-react";

import "./greetings.css";

function Greetings({ setSelected }) {
  const handleClick = () => {
    setSelected("dashboard");
  };
  return (
    <div
      className="greetingsBody"
      style={{ overflow: "hidden", textAlign: "center" }}
    >
      <Grid>
        <Grid.Row>
          <p>Decentralised Secure Collaborations</p>
        </Grid.Row>

        <Grid.Row centered>
          <Button
            onClick={handleClick}
            style={{
              background:
                "linear-gradient(to bottom, #0a404b, #08262e 50%, #0a404b)",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "15px 30px",
              fontSize: "1.5rem",
              cursor: "pointer",
              transition: "background 0.3s ease", // Smooth transition for hover
              marginBottom: "2%",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#28c2d7")} // Change color on hover
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(to bottom, #0a404b, #08262e)")
            } // Revert color
          >
            Dashboard
          </Button>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Greetings;
