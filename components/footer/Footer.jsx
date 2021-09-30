import styles from "./Footer.module.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookSquare, FaTwitterSquare, FaYoutubeSquare, FaTwitch } from 'react-icons/fa';

import Link from "next/link";

const Footer = () => {
  return (

    <footer>
      <div className={`${styles.footerCustom} py-3`}>
        <Container>
          <Row className="pb-3 g-0">
            <Col md={8}>
              <ul className="d-flex justify-content-evenly">
                <li><Link href="/">main</Link></li>
                <li><a href="#gameplay">about</a></li>
                <li><a href="#features">game features</a></li>
                <li><a href="#requirement">system requirements</a></li>
                <li><a href="#topscore">quotes</a></li>
              </ul>
            </Col>
            <Col >
              <ul className="d-flex justify-content-evenly icon--custom">
                <li><a href="#facebook"><FaFacebookSquare style={{color : "#4267B2", fontSize: "1.5rem"}}/></a></li>
                <li><a href="#twitter"><FaTwitterSquare style={{color : "#1DA1F2", fontSize: "1.5rem"}}/></a></li>
                <li><a href="#twitch"><FaTwitch style={{color : "#6441a5", fontSize: "1.5rem"}}/></a></li>
                <li><a href="#youtube"><FaYoutubeSquare style={{color : "#FF0000", fontSize: "1.5rem"}}/></a></li>
              </ul>
            </Col>
          </Row>
          <Row className={`${styles.footerCustom_line} pt-2`}>
            <Col md={4}>
              <ul className="d-flex justify-content-center justify-content-md-start">
                <li><p id="copyright">&#169; 2021 Your Games, Inc. All Right Reserved</p></li>
              </ul>
            </Col>
            <Col md={8}>
              <ul className="d-flex me-auto justify-content-center justify-content-md-end">
                <li><a href="#gameplay">privacy policy</a></li>
                <li><a href="#features">terms of service</a></li>
                <li><a href="#requirement">code of conducts</a></li> 
              </ul>
            </Col>
          </Row>
          </Container>
      </div>
    </footer>
  );
};

export default Footer;
