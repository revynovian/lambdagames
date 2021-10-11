import styles from "./Features.module.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Features = () => {
  return (
    <div className={styles.featuresPage}>
      <Container>
        <Row className="justify-content-end">
          <Col lg={6}>
            <p className="lead" style={{ color: "whitesmoke", marginTop: "50px" }}>
              What&apos;s so special?
            </p>
            <h1 className="display-4 fw-normal" style={{ color: "whitesmoke", marginTop: "10px" }}>
              FEAUTRES
            </h1>

            <div className={styles.listMenu}>
              <div className={styles.listFeatures}>
                <h3>TRADITIONAL GAMES</h3>
                <p>If you miss your childhood, we provide many traditional games here</p>
              </div>
              <div className={styles.listFeatures}>
                <h3>GAME SUIT</h3>
                <p>Batu, Gunting, Kertas</p>
              </div>
              <div className={styles.listFeatures}>
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
