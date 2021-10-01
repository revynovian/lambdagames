import styles from "./Register.module.css";
import React, { useState } from "react";
// import Axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Link from "next/link";

const Register = (props) => {
  // const url = "http://localhost:3000/user/register";
  const [player, setPlayer] = useState({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    city: "",
    bio: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const handle = (e) => {
    const newPlayer = { ...player };
    newPlayer[e.target.id] = e.target.value;
    setPlayer(newPlayer);
  };
  const handlerRegister = (e) => {
    e.preventDefault();
    setisLoading(true)
    // Axios.post(url, {
    //   username: player.username,
    //   email: player.email,
    //   password: player.password,
    //   firstname: player.firstname,
    //   lastname: player.lastname,
    //   city: player.city,
    //   bio: player.bio,
    // })
    //   .then((response) => {
    //     // console.log(response.player);
    //     setisLoading(false);
    //     props.history.push("/login");
    //   })
    //   .catch((error) => {
    //     if (error.response.status === 401 || error.response.status === 400) {
    //       setError(error.response.data.message);
    //     } else {
    //       setError("Something went wrong. Please try again later");
    //     }
    //     setisLoading(false);
    //     console.error("Failed:", error);
    //   });
  };
  return (
    <div>
        <Container fluid className={`${styles.registerPage} p-5`}>
          <Row className="justify-content-center p-5">
            <Col md={5} className={`text-white p-5 ${styles.background}`} >
              <h2 className="text-center">Sign Up</h2>
              {error && <div className="error">{error}</div>}

              <Form onSubmit={(e) => handlerRegister(e)}>
                <p className="text-muted fs-6">Basic Information</p>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="username">Username</Form.Label>
                  <Form.Control required type="text" id="username" name="username" onChange={(e) => handle(e)} value={player.username} placeholder="Enter new username" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="email">Email Address</Form.Label>
                  <Form.Control required type="email" id="email" name="email" onChange={(e) => handle(e)} value={player.email} placeholder="Enter your email" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control required type="password" id="password" name="password" onChange={(e) => handle(e)} value={player.password} placeholder="Enter new password" />
                </Form.Group>

                <Row className="mb-3">
                  <p className="text-muted fs-6">Personal Details</p>
                  <Form.Group as={Col}>
                    <Form.Label htmlFor="firstname">First Name</Form.Label>
                    <Form.Control required type="text" id="firstname" name="firstname" onChange={(e) => handle(e)} value={player.firstname} placeholder="John" />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label htmlFor="lastname">Last Name</Form.Label>
                    <Form.Control required type="text" id="lastname" name="lastname" onChange={(e) => handle(e)} value={player.lastname} placeholder="Cena" />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="city">City</Form.Label>
                  <Form.Control required type="text" id="city" name="city" onChange={(e) => handle(e)} value={player.city} placeholder="Enter city" />
                </Form.Group>

                <Form.Group className="mb-5">
                  <Form.Label htmlFor="bio">Biodata</Form.Label>
                  <Form.Control required as="textarea" id="bio" name="bio" onChange={(e) => handle(e)} value={player.bio} placeholder="Enter short description about you" />
                </Form.Group>

                <Row className="mb-4 custom-button">
                  <Col className="text-center">
                    <Button variant="warning" type="submit" className="ps-5 pe-5">
                    <strong>{isLoading ? 'Loading…' : 'Register'}</strong>
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <Col className={`text-center ${styles.link}`}>
                    <Link href="/login" className="text-warning">
                      Have an account? Login
                    </Link>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
    </div>
  );
};

export default Register;
