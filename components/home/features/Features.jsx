import "./Features.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Features = () => {
  return (
    <div className="jumbotron jumbotron-fluid features-page">
      <Container>
        <Row className="justify-content-end">
          <Col lg={6}>
            <p className="lead">What's so special?</p>
            <h1 className="display-4">FEAUTRES</h1>

            <div className="list-menu">
              <div className="list-features">
                <h3>TRADITIONAL GAMES</h3>
                <p>If you miss your childhood, we provide many traditional games here</p>
              </div>
              <div className="list-features">
                <h3>GAME SUIT</h3>
                <p>Batu, Gunting, Kertas</p>
              </div>
              <div className="list-features">
                <h3>TBD</h3>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Features;
