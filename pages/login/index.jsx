import styles from "./Login.module.css";
import React, { useState, useEffect } from "react";

import { FaEye , FaEyeSlash } from 'react-icons/fa';
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

import Link from "next/link"
// import hooks
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
// import actions
import { loginAsync } from '../../store/slices/user'

const Login = () => {

  // const User = useSelector((state) => state.auth.isAuthenticated)
  const Role = useSelector((state) => state.user.role)
  // get dispatch function using hook
  const dispatch = useDispatch()

  const router = useRouter();

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
    setisLoading(true)
    dispatch(loginAsync({usernameOrEmail,password}))
    .unwrap()
    .then((res) => {
      // setisLoading(false)
    }).catch ((err) => {
      setError(err)
      setisLoading(false)
    })
  };

  useEffect (() => {
    if (Role === "admin") {
      router.push("dashboard/admin");
    } else if (Role === "user") {
      router.push("dashboard");
    }
  })

  return (
    <div>
      <Container fluid className={`${styles.loginPage} p-5`}>
        <Row className="justify-content-center vh-100 align-items-center py-5 ">
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
