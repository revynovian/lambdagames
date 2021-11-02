import styles from './Header.module.css'
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';

import { Navbar, Nav, Container, Modal, Button , Image} from "react-bootstrap";
import { FaSignOutAlt } from 'react-icons/fa';
// import { FiHexagon } from "react-icons/fi";

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/user';
import Cookies from 'js-cookie';
const Header = () => {
  const dispatch = useDispatch()

  // const isAuthenticated = useSelector((state => state.auth.isAuthenticated))
  const role = useSelector((state => state.user.role))
  const isAuthenticated = useSelector((state => state.isAuthenticated))

  // console.log(isAuthenticated)
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
  
  const router = useRouter();
  // console.log(router.pathname)
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" fixed="top" className={styles.customNavbar} >
        <Container>
          <Navbar.Brand className="text-white" href="/">
          <Image src="/img/logobig.png" style={{width: "20px", height: "24px" ,marginRight: "10px"}} alt="logo-icon"/>
            BINAR GAMEHUB
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">

            <Nav className={`${styles.customNavbarLink} me-auto`}>
              <Link href="/">
                <a className={router.pathname === "/" ? `${styles.activeLink}` : ""}>Home</a>
              </Link>
                {!isAdmin && (
                  <Link href="/dashboard">
                    <a className={router.pathname === "/dashboard" ? `${styles.activeLink}` : ""}>Dashboard</a>
                  </Link>)}
                {isAdmin && (<Link href="/dashboard/admin">
                    <a className={router.pathname === "/dashboard/admin" ? `${styles.activeLink}` : ""}>Dashboard</a>
                  </Link>)}
              
              <Link href="/about" >
                <a className={router.pathname === "/about" ? `${styles.activeLink}` : ""} >
                  About Us
                </a>
              </Link>
            </Nav>
            <Nav className={`${styles.customNavbarLink}`}>
              {!isAuthenticated && (
                <Link href="/login">
                  <a className={router.pathname === "/login" ? `${styles.activeLink}` : ""}>Login</a>
                </Link>
              )}
              {!isAuthenticated && (
                <Link href="/register">
                  <a className={router.pathname === "/register" ? `${styles.activeLink}` : ""}>Register</a>
                </Link>
              )}
              {isAuthenticated && (
                <Nav.Link  onClick={handleShow} style={{color : "white"}}>
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
