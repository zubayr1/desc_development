import React from "react";
import { Grid, Icon } from "semantic-ui-react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

function Roadmap() {
  return (
    <div
      style={{
        overflow: "hidden",
        textAlign: "center",
        backgroundColor: "#000c14",
      }}
    >
      <Grid centered>
        <Grid.Row only="computer tablet">
          <p
            style={{
              color: "white",
              fontSize: "3.5rem",
              fontFamily: "Orbitron, sans-serif",
              textAlign: "center",
              marginTop: "5%",
            }}
          >
            DeSC Roadmap
          </p>
        </Grid.Row>

        <Grid.Row only="mobile">
          <p
            style={{
              color: "white",
              fontSize: "1.5rem",
              fontFamily: "Orbitron, sans-serif",
              textAlign: "center",
              marginTop: "2%",
            }}
          >
            DeSC Roadmap
          </p>
        </Grid.Row>

        <Grid.Row>
          <VerticalTimeline>
            <VerticalTimelineElement
              iconStyle={{ background: "#1D3557", color: "#fff" }}
              contentStyle={{ borderTop: "5px solid #1D3557" }} // Add edge color
            >
              <h3 className="vertical-timeline-element-title">
                MVP - Basic Registration & Setup
              </h3>
              <p>Focus on user registration, SBT identity, role assignment.</p>
              <p>
                <Icon name="clock outline" /> 3-4 weeks
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              iconStyle={{ background: "#457B9D", color: "#fff" }}
              contentStyle={{ borderTop: "5px solid #457B9D" }} // Add edge color
            >
              <h3 className="vertical-timeline-element-title">
                Collaboration Features & Chatbot
              </h3>
              <p>Basic collaboration and encrypted chatbot integration.</p>
              <p>
                <Icon name="clock outline" /> 6-8 weeks
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              iconStyle={{ background: "#A8DADC", color: "#fff" }}
              contentStyle={{ borderTop: "5px solid #A8DADC" }} // Add edge color
            >
              <h3 className="vertical-timeline-element-title">
                Moderator & Voting Mechanism
              </h3>
              <p>Introduce moderation and voting mechanisms.</p>
              <p>
                <Icon name="clock outline" /> 4-6 weeks
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              iconStyle={{ background: "#F1FAEE", color: "#000" }}
              contentStyle={{ borderTop: "5px solid #F1FAEE" }} // Add edge color
            >
              <h3 className="vertical-timeline-element-title">
                Enhanced Dispute Resolution
              </h3>
              <p>MNC and advanced voting systems.</p>
              <p>
                <Icon name="clock outline" /> 6-8 weeks
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              iconStyle={{ background: "#E63946", color: "#fff" }}
              contentStyle={{ borderTop: "5px solid #E63946" }} // Add edge color
            >
              <h3 className="vertical-timeline-element-title">
                Investor & Multi-party Collaboration
              </h3>
              <p>Investor contracts and multi-party support.</p>
              <p>
                <Icon name="clock outline" /> 3-4 weeks
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              iconStyle={{ background: "#1D3557", color: "#fff" }}
              contentStyle={{ borderTop: "5px solid #1D3557" }} // Add edge color
            >
              <h3 className="vertical-timeline-element-title">
                Public Launch & ZKP Integration
              </h3>
              <p>
                Full launch with ZKP, privacy, and performance enhancements.
              </p>
              <p>
                <Icon name="clock outline" /> 8-12 weeks
              </p>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Roadmap;
