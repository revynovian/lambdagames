import styles from './Header.module.css'
import React, { useState } from "react";
import Link from "next/link";

import { Navbar, Nav, Container, Modal, Button } from "react-bootstrap";
import { FaSignOutAlt } from 'react-icons/fa';
import { FiHexagon } from "react-icons/fi";

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/user';
import Cookies from 'js-cookie';
const Header = () => {
  const dispatch = useDispatch()

  // const isAuthenticated = useSelector((state => state.auth.isAuthenticated))
  const role = useSelector((state => state.user.role))
  const isAuthenticated = useSelector((state => state.isAuthenticated))

  console.log(isAuthenticated)
  const isAdmin  = (role === "admin" ? true : false)

  // bootstrap modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlerLogout = (e) => {
    setShow(false);
    dispatch(logout());
    Cookies.remove("token");
    Cookies.remove("userID");
    
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" fixed="top" className={styles.customNavbar} >
        <Container>
          <Navbar.Brand className="text-white" href="/">
            <FiHexagon style={{transform: "rotate(90deg)"}} /> BINAR GAMEHUB
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">

            <Nav className={`${styles.customNavbarLink} me-auto`}>
              <Nav.Link as={Link} href="/">
                Home
              </Nav.Link>
                {!isAdmin && (<Nav.Link  as={Link} href="/dashboard">Dashboard
                </Nav.Link>)}
                {isAdmin && (<Nav.Link  as={Link} href="/dashboard/admin">
                  Dashboard
                </Nav.Link>)}
              <Nav.Link as={Link} href="/about">
                About Us
              </Nav.Link>
            </Nav>
            <Nav className={`${styles.customNavbarLink}`}>
              {!isAuthenticated && (
                <Nav.Link as={Link} href="/login">
                  Login
                </Nav.Link>
              )}
              {!isAuthenticated && (
                <Nav.Link as={Link} href="/register">
                  Register
                </Nav.Link>
              )}
              {isAuthenticated && (
                <Nav.Link  onClick={handleShow}>
                  <FaSignOutAlt /> Logout
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* modal section */}
      <Modal show={show} onHide={handleClose} backdrop={true} centered animation={false}>
            <Modal.Body className="py-5 rounded">
              <h5>Are you sure you want to logout?</h5>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Link href="/login" passHref >
                <Button variant="danger" onClick={handlerLogout} >Logout</Button>
              </Link>
            </Modal.Footer>
        </Modal>
    </div>
  );
};

export default Header;
