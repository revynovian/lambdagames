import "./Requirements.css";
import React from "react";
import { Table, Container, Row, Col } from "react-bootstrap";

const Requirements = () => {
  return (
    <div className="jumbotron jumbotron-fluid requirements-page">
      <Container>
        <Row>
          <Col lg={4}>
            <h1 className="display-4">SYSTEM REQUIREMENTS</h1>
          </Col>

          <Col lg={8}>
            <p className="lead">Can My Computer Run This Game?</p>
          </Col>
        </Row>

        <Row>
          <Col lg={6} className="table-requrements">
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
