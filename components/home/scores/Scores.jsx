import styles from "./Scores.module.css";
import React from "react";
// import profile1 from "/img/people-1";
// import profile2 from "/img/people-1";
// import profile3 from "/img/people-1";
// import twitter from "/img/twitter.svg";
import { Card, Container, Row, Col, Button, Image } from "react-bootstrap";
// import Image from "next/image";

const Scores = () => {
  return (
    <div className={styles.scorePage}>
      <Container>
        <Row>
          <Col lg={6}>
            <h1 className="display-4 fw-normal" style={{ color: "whitesmoke", marginTop: "50px" }}>
              TOP SCORES
            </h1>

            <p className="lead" style={{ color: "whitesmoke", marginTop: "10px" }}>
              This top score from various games provide on this platform
            </p>
            <Button className="btn btn-warning btn-lg ps-5 pe-5" href="#home">
              See More
            </Button>
          </Col>

          <Col lg={6} className="mt-5">
            <Row className="card-main mb-3">
              <Col className="d-flex justify-content-end">
                <Card className={styles.cardCustom} style={{ width: "30rem", backgroundColor: "#1A1C1D" }}>
                  <Card.Body>
                    <Col className={styles.circleBg} style={{ float: "left" }}>
                      <Image src={"/img/people-1.jpg"} alt="profile" width={70} height={70} className={styles.avatar} />
                    </Col>

                    <Col lg={6} className="ms-3 mt-2 float-start">
                      <Card.Title>Evan Lahti</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">PC Gamer</Card.Subtitle>
                    </Col>

                    <Col className="ms-3 mt-2">
                      <a href="#home">{/* <Image src={twitter} alt="twiiter" style={{ float: "right" }} /> */}</a>
                    </Col>

                    <Col className="mt-5">
                      <Card.Text className="fs-5">“One of my gaming highlights of the year.“</Card.Text>
                      <Card.Text className="text-muted fs-6">18 October 2018</Card.Text>
                    </Col>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="card-main mb-3">
              <Col className="d-flex">
                <Card className={styles.cardCustom} style={{ width: "30rem", backgroundColor: "#1A1C1D" }}>
                  <Card.Body>
                    <Col className={styles.circleBg} style={{ float: "left" }}>
                      <Image src={"/img/people-2.jpg"} alt="profile" width={70} height={70} className={styles.avatar} />
                    </Col>

                    <Col lg={6} className="ms-3 mt-2 float-start">
                      <Card.Title>Jada Griffin</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Nerdreactor</Card.Subtitle>
                    </Col>

                    <Col className="ms-3 mt-2">
                      <a href="#home">{/* <Image src={twitter} alt="twiiter" className="float-end" /> */}</a>
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
                <Card className={styles.cardCustom} style={{ width: "30rem", backgroundColor: "#1A1C1D" }}>
                  <Card.Body>
                    <Col className={styles.circleBg} style={{ float: "left" }}>
                      <Image src={"/img/people-3.jpg"} alt="profile" width={70} height={70} className={styles.avatar} />
                    </Col>

                    <Col lg={6} className="ms-3 mt-2" style={{ float: "left" }}>
                      <Card.Title>Aaoron Williams</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Uproxx</Card.Subtitle>
                    </Col>

                    <Col className="ms-3 mt-2">
                      <a href="#home">{/* <Image src={twitter} alt="twiiter" style={{ float: "right" }} /> */}</a>
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
