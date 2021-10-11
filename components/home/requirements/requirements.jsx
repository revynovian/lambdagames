import styles from "./Requirements.module.css";
import React from "react";
import { Table, Container, Row, Col } from "react-bootstrap";

const Requirements = () => {
  return (
    <div className={styles.requirementsPage}>
      <Container>
        <Row>
          <Col lg={4}>
            <h1 className="display-4 fw-normal" style={{ color: "whitesmoke", marginTop: "10px" }}>
              SYSTEM REQUIREMENTS
            </h1>
          </Col>

          <Col lg={8}>
            <p className="lead" style={{ color: "whitesmoke" }}>
              Can My Computer Run This Game?
            </p>
          </Col>
        </Row>

        <Row>
          <Col lg={6} className={styles.tableRequrements}>
            <Table responsive="sm" style={{ height: "20rem" }} className="mt-3">
              <tbody>
                <tr>
                  <td>
                    <span>OS :</span>
                    <br />
                    Windows 7 64-bit only <br />
                    (No OSX support at this time)
                  </td>
                  <td>
                    <span>PROCESSOR :</span>
                    <br />
                    Intel Core Duo @ 2.4 GHZ or AMD Athlon 2 X2 @ 2.8 GHZ
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>MEMORY :</span>
                    <br />
                    4GB RAM
                  </td>
                  <td>
                    <span>STORAGE :</span>
                    <br />
                    8GB Avalaible Space
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <span>GRAPHICS :</span>
                    <br />
                    NVDIA GeForce GTX 660 2GB or AMD Radeon HD 7850 2GB DirectX11(Shader Model 5)
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Requirements;
