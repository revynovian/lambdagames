import "./Subscribe.css";
import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Subscribe = () => {
  return (
    <div className="jumbotron jumbotron-fluid subscribe-page">
      <Container>
        <Row className="justify-content-end">
          <Col lg={6} className="mt-5">
            <p className="lead">Want to stay in touch?</p>
            <h1 className="display-4">NEWSLETTER SUBSCRIBE</h1>

            <p className="text-subscribe">
              In order to start reviewing our news all you have to do is enter your email address. Everything else will be taking care of by us. We will send you email containing information about the game. We don't spam.
            </p>

            <Row>
              <Form className="mt-4">
                <Col lg={5} className="float-start">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="youremail@binar.co.id" className="bg-dark p-2" style={{ color: "orange", borderWidth: "0" }} />
                  </Form.Group>
                </Col>

                <Col>
                  <Button variant="warning" type="submit">
                    Subscribe Now
                  </Button>
                </Col>
              </Form>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Subscribe;
