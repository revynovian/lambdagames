import "./Scores.css";
import React from "react";
import profile1 from "../../../assets/people-1.jpg";
import profile2 from "../../../assets/people-2.jpg";
import profile3 from "../../../assets/people-3.jpg";
import twitter from "../../../assets/twitter.svg";
import { Card, Container, Row, Col, Image, Button } from "react-bootstrap";

const Scores = () => {
  return (
    <div className="jumbotron jumbotron-fluid score-page">
      <Container>
        <Row>
          <Col lg={6}>
            <h1 className="display-4">TOP SCORES</h1>

            <p className="lead">This top score from various games provide on this platform</p>
            <Button className="btn btn-warning btn-lg ps-5 pe-5" href="#home">
              See More
            </Button>
          </Col>

          <Col lg={6} className="mt-5">
            <Row className="card-main mb-3">
              <Col className="d-flex justify-content-end">
                <Card className="card text-white p-1 card-custom" style={{ width: "30rem", backgroundColor: "#1A1C1D" }}>
                  <Card.Body>
                    <Col className="circle--bg">
                      <Image src={profile1} className="avatar rounded-circle" />
                    </Col>

                    <Col lg={6} className="ms-3 mt-2 float-start">
                      <Card.Title>Evan Lahti</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">PC Gamer</Card.Subtitle>
                    </Col>

                    <Col className="ms-3 mt-2">
                      <a href="#home">
                        <Image src={twitter} style={{ float: "right" }} />
                      </a>
                    </Col>

                    <Col className="mt-5">
                      <Card.Text className="fs-5">"One of my gaming highlights of the year."</Card.Text>
                      <Card.Text className="text-muted fs-6">18 October 2018</Card.Text>
                    </Col>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="card-main mb-3">
              <Col className="d-flex">
                <Card className="text-white p-1 card-custom" style={{ width: "30rem", backgroundColor: "#1A1C1D" }}>
                  <Card.Body>
                    <Col className="circle--bg">
                      <Image src={profile2} className="avatar rounded-circle" />
                    </Col>

                    <Col lg={6} className="ms-3 mt-2 float-start">
                      <Card.Title>Jada Griffin</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Nerdreactor</Card.Subtitle>
                    </Col>

                    <Col className="ms-3 mt-2">
                      <a href="#home">
                        <Image src={twitter} className="float-end" />
                      </a>
                    </Col>

                    <Col className="mt-5">
                      <Card.Text className="fs-5">“The next big thing in the world of streaming and survival games.”</Card.Text>
                      <Card.Text className="text-muted fs-6">Desember 21, 2018</Card.Text>
                    </Col>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="card-main">
              <Col className="d-flex justify-content-end">
                <Card className="text-white p-1 card-custom" style={{ width: "30rem", backgroundColor: "#1A1C1D" }}>
                  <Card.Body>
                    <Col className="circle--bg">
                      <Image src={profile3} className="avatar rounded-circle" />
                    </Col>

                    <Col lg={6} className="ms-3 mt-2" style={{ float: "left" }}>
                      <Card.Title>Aaoron Williams</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Uproxx</Card.Subtitle>
                    </Col>

                    <Col className="ms-3 mt-2">
                      <a href="#home">
                        <Image src={twitter} style={{ float: "right" }} />
                      </a>
                    </Col>

                    <Col className="mt-5">
                      <Card.Text className="fs-5">“Snoop Dogg Playing The Wildly Entertaining ‘SOS’ Is Ridiculous.”</Card.Text>
                      <Card.Text className="text-muted fs-6">Desember 24, 2018</Card.Text>
                    </Col>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Scores;
