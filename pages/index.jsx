import styles from '../styles/Home.module.css'
import React from "react";
import Thegames from "../components/home/the-games/Thegames";
// import Requirements from "./requirements/Requirements";
// import Features from "./features/Features";
// import Scores from "./scores/Scores";
// import Subscribe from "./subscribe/Subscribe";
// import Footer from "../footer/Footer";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { BiChevronsDown } from "react-icons/bi";
import Link from "next/link";

const Home = () => {
  return (
    <main>
      <div className={styles.mainPage}>
        <Container >
          <Row style={{ marginTop: "120px" }} className="text-start">
            <Col>
              <h1 className={styles.textAnimation_a}>PLAY</h1>
              <h1 className={styles.textAnimation_b}>TRADITIONAL GAME</h1>
              <h2 className={styles.typing}>Experience new traditional game play</h2>
              <Link href="/games/rps/play" passHref>
                <Button  className={`${styles.customButton} mt-5 `} role="button">
                  <strong>PLAY NOW</strong>
                </Button>
              </Link>
            </Col>
          </Row>
          <Row style={{ margin: "100px" }} className="text-center">
            <Col>
              <p className="text">THE STORY</p>
              <a href="#games" className="rounded">
                <BiChevronsDown className={styles.iconAnimation}/>
              </a>
            </Col>
          </Row>
        </Container>
      </div>
        <Thegames />
    </main>
    
  );
};

export default Home;
