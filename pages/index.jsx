import styles from "../styles/Home.module.css";
import React from "react";
import Thegames from "../components/home/the-games/thegames";
import Requirements from "../components/home/requirements/requirements";
import Features from "../components/home/features/features";
import Scores from "../components/home/scores/scores";
import Subscribe from "../components/home/subscribe/subscribe";
// import Footer from "../footer/Footer";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BiChevronsDown } from "react-icons/bi";
import Link from "next/link";

const Home = () => {
  return (
    <main>
      <div className={styles.mainPage}>
        <Container>
          <Row style={{ marginTop: "120px" }} className="text-start">
            <Col>
              <h1 className={styles.textAnimation_a}>PLAY</h1>
              <h1 className={styles.textAnimation_b}>TRADITIONAL GAME</h1>
              <h2 className={styles.typing}>Experience new traditional game play</h2>
              <Link href="/games/rps/play" passHref>
                <Button className={`${styles.customButton} mt-5 `} variant="warning">
                  <strong>PLAY NOW</strong>
                </Button>
              </Link>
            </Col>
          </Row>
          <Row style={{ margin: "100px" }} className="text-center">
            <Col>
              <p className="text">THE STORY</p>
              <a href="#games" className="rounded">
                <BiChevronsDown className={styles.iconAnimation} />
              </a>
            </Col>
          </Row>
        </Container>
      </div>
      <Thegames />
      <Requirements />
      <Features />
      <Scores />
      <Subscribe />
    </main>
  );
};

export default Home;
