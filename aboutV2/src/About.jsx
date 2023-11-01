import React from "react";
import { Grid, Row, Column } from "@carbon/react";

function App() {
  return (
    <>
      <Grid>
        <Row>
          <Column sm={4} md={8} lg={16}>
            <div
              className="section1"
              style={{ background: "#161616", color: "#fff" }}
            >
              <div>
                <p className="name">Adhithya</p>
                <p className="captionName">
                  I am a passionate electrical and electronics engineering
                  undergraduate student from Chennai, India.{" "}
                </p>
              </div>
              <img src="0.png" alt="Image" style={{ float: "right" }} />
            </div>
          </Column>
        </Row>
        <Row>
          <Column sm={4} md={8} lg={16}>
            <div style={{ background: "#6ba4ff", color: "#000" }}>ddd</div>
          </Column>
        </Row>
        <Row>
          <Column sm={4} md={8} lg={16}>
            <div style={{ background: "#1844de", color: "#000" }}>ddd</div>
          </Column>
        </Row>
      </Grid>
    </>
  );
}

export default App;
