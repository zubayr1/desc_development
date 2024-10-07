import React from "react";
import { Grid, Button, Segment, Header, Icon } from "semantic-ui-react";

import desc_whitepaper from "../assets/DeSC_ WhitePaper.docx";
import desc_litepaper from "../assets/DeSC_ LitePaper.docx";
import desc_useCasepaper from "../assets/DeSC_UseCase.docx";

import "./papers.css";

function Papers() {
  const handleDownload = (paper) => {
    let fileUrl;
    if (paper === "whitepaper") {
      fileUrl = desc_whitepaper;
    } else if (paper === "litepaper") {
      fileUrl = desc_litepaper;
    } else {
      fileUrl = desc_useCasepaper;
    }

    // Create a temporary link element to trigger the download
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop(); // The filename will be based on the file path
    link.click();
  };

  return (
    <div
      className="greetingsBody"
      style={{ overflow: "hidden", textAlign: "center" }}
    >
      <Grid centered style={{ width: "100%" }}>
        <Grid.Row only="computer tablet">
          <Grid centered style={{ width: "100%" }}>
            <Grid.Row>
              <p
                style={{
                  marginTop: "-5%",
                  color: "white",
                  fontSize: "3.5rem",
                  fontFamily: "Orbitron, sans-serif",
                }}
              >
                Papers
              </p>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={5}>
                <Segment placeholder>
                  <Header icon>
                    <Icon name="pdf file outline" />
                    Whitepaper
                  </Header>
                  <Button onClick={() => handleDownload("whitepaper")} primary>
                    Download
                  </Button>
                </Segment>
              </Grid.Column>

              <Grid.Column width={5}>
                <Segment placeholder>
                  <Header icon>
                    <Icon name="pdf file outline" />
                    Litepaper
                  </Header>
                  <Button onClick={() => handleDownload("litepaper")} primary>
                    Download
                  </Button>
                </Segment>
              </Grid.Column>

              <Grid.Column width={5}>
                <Segment placeholder>
                  <Header icon>
                    <Icon name="pdf file outline" />
                    UseCase Paper
                  </Header>
                  <Button
                    onClick={() => handleDownload("usecasepaper")}
                    primary
                  >
                    Download
                  </Button>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Row>

        <Grid.Row only="mobile" centered>
          <Grid centered>
            <Grid.Row>
              <p
                style={{
                  color: "white",
                  fontSize: "1.5rem",
                  fontFamily: "Orbitron, sans-serif",
                  marginTop: "2%",
                }}
              >
                Papers
              </p>
            </Grid.Row>
            <Grid.Row style={{ marginTop: "-2%" }}>
              <Grid.Column width={14}>
                <Segment placeholder>
                  <Header icon>
                    <Icon name="pdf file outline" />
                    Whitepaper
                  </Header>
                  <Button onClick={() => handleDownload("whitepaper")} primary>
                    Download
                  </Button>
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={14}>
                <Segment placeholder>
                  <Header icon>
                    <Icon name="pdf file outline" />
                    Litepaper
                  </Header>
                  <Button onClick={() => handleDownload("litepaper")} primary>
                    Download
                  </Button>
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={14}>
                <Segment placeholder>
                  <Header icon>
                    <Icon name="pdf file outline" />
                    UseCase Paper
                  </Header>
                  <Button
                    onClick={() => handleDownload("usecasepaper")}
                    primary
                  >
                    Download
                  </Button>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Papers;
