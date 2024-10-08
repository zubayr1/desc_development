import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Grid, Segment } from "semantic-ui-react";

function EntitySet({ entityType }) {
  // State variables to store initiators and acceptors
  const [initiators, setInitiators] = useState([]);
  const [acceptors, setAcceptors] = useState([]);

  // Function to fetch initiators
  const fetchInitiators = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/get_all_collabs_rolebased",
        {
          params: { string: "initiator" },
        }
      );
      if (response.status === 200) {
        setInitiators(response.data); // Assuming single object; update this to response.data if multiple are returned
      }
    } catch (error) {
      console.error("Failed to fetch initiators:", error);
    }
  };

  // Function to fetch acceptors
  const fetchAcceptors = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/get_all_collabs_rolebased",
        {
          params: { string: "acceptor" },
        }
      );
      if (response.status === 200) {
        setAcceptors(response.data);
        console.log(JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Failed to fetch acceptors:", error);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    if (entityType === "Initiator Set") {
      fetchInitiators();
    } else if (entityType === "Acceptor Set") {
      fetchAcceptors();
    }
  }, [entityType]);

  // Function to handle rating (for demonstration purposes)
  const handleAddRating = (address) => {
    alert(`Add rating for: ${address}`);
  };

  let layout;

  // Display initiators
  if (entityType === "Initiator Set") {
    layout = (
      <Grid>
        <Grid.Row>
          {initiators.length > 0 ? (
            initiators.map((initiator, index) => (
              <Grid.Column key={index} width={4}>
                <Segment raised color="blue" floated="">
                  <div
                    style={{ borderTop: "4px solid #0a404b", padding: "10px" }}
                  >
                    {initiator[1]}
                  </div>

                  <Button primary onClick={() => handleAddRating(initiator[1])}>
                    Add Rating
                  </Button>
                </Segment>
              </Grid.Column>
            ))
          ) : (
            <Grid.Column>
              <p>No initiators found</p>
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
    );
  }

  // Display acceptors
  else if (entityType === "Acceptor Set") {
    layout = (
      <Grid>
        {acceptors.length > 0 ? (
          acceptors.map((acceptor, index) => (
            <Grid.Column key={index} width={4}>
              <Segment raised color="red">
                <div
                  style={{ borderTop: "4px solid #0a404b", padding: "10px" }}
                >
                  {acceptor[1]}
                </div>

                <Button primary onClick={() => handleAddRating(acceptor[1])}>
                  Add Rating
                </Button>
              </Segment>
            </Grid.Column>
          ))
        ) : (
          <Grid.Column>
            <p>No acceptors found</p>
          </Grid.Column>
        )}
      </Grid>
    );
  }

  // Coming soon layout for moderators
  else if (entityType === "Moderator Set") {
    layout = (
      <div
        style={{
          width: "100%",
          height: "30vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
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
          }}
        >
          Coming Soon
        </Button>
      </div>
    );
  } else {
    layout = <div></div>;
  }

  return <div>{layout}</div>;
}

export default EntitySet;
