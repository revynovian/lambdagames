import styles from "./Login.module.css";
import React, { useState, useContext } from "react";

import { FaEye , FaEyeSlash } from 'react-icons/fa';
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

import Link from "next/link"
import { useRouter } from 'next/router'
import Axios from "axios";

// import hooks
import { useDispatch, useSelector } from 'react-redux'
// import actions
import { login, logout } from '../../store/slices/user'

const Login = () => {

  const User = useSelector((state) => state.auth.isAuthenticated)
  // get dispatch function using hook
  const dispatch = useDispatch()

  const router = useRouter();

  const url = "http://localhost:3000/user/login";
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const tooglePassword = ()=> {
    setPasswordShown(passwordShown ? false : true);
  }
  const handlerLogin = (e) => {
    e.preventDefault();
    setisLoading(true);
    Axios.post(url, {
      usernameOrEmail: usernameOrEmail,
      password: password,
    })
      .then((res) => {
        setisLoading(false);

        const accessToken = res.data.accessToken
        const id = res.data.id
        const role = res.data.role

        dispatch(login({accessToken, id, role}));
        console.log(User)

        // if (user.role === "admin") {
        //   router.push("dashboard/admin");
        // } else {
        //   router.push("dashboard");
        // }
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data);
        } else {
          setError("Something went wrong. Please try again later");
        }
        setisLoading(false);
      });
  };

  return (
    <div>
      <Container fluid className={`${styles.loginPage}`}>
        <Row className="justify-content-center vh-100 align-items-center pb-5 ">
          <Col md={4} className={`${styles.loginForm_custom} text-white p-5`}>
            <h2 className="text-center">Login</h2>
            {error && (
              <Alert className="my-3" variant={"danger"}>
                {error}
              </Alert>
            )}

            <Form onSubmit={(e) => handlerLogin(e)}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="usernameOrEmail">Username or Email Address</Form.Label>
                <Form.Control type="text" id="usernameOrEmail" name="usernameOrEmail" value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} placeholder="Enter username or email" />
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control type={passwordShown ? "text" : "password"} id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                {passwordShown ? 
                  <FaEye className={styles.passwordIcon} onClick={tooglePassword} />
                  :
                  <FaEyeSlash className={styles.passwordIcon} onClick={tooglePassword} />
                }
              </Form.Group>

              <Row className="mb-4 custom-button">
                <Col className="text-center">
                  <Button variant="warning" type="submit" className="ps-5 pe-5" disabled={isLoading}>
                    <strong>{isLoading ? "Loading…" : "Login"}</strong>
                  </Button>
                </Col>
              </Row>

              <Row>
                <Col className={`${styles.link} text-center`}>
                  <p>Don&apos;t have an account?</p>
                  <Link href="/register">
                    Create one for FREE!
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

export default Login;
