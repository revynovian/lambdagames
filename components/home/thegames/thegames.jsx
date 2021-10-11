import styles from './Thegames.module.css';
import { Carousel, Container, Row, Col, Image } from 'react-bootstrap';

import React from 'react';
import { useState } from 'react';

const Thegames = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div className={styles.gamesPage} id="games">
      <Container>
        <Row className="text-center align-items-center vh-100">
          <Col lg={4}>
            <p className="lead">What&apos;s so special?</p>
            <h1 className="display-4">THE GAMES</h1>
          </Col>
          <Col lg={8} className="slider-layout">
            <Carousel activeIndex={index} onSelect={handleSelect} slide={false} fade={false}>
              <Carousel.Item>
                <Image className="d-block w-100" src={'/img/slider-1.jpg'} alt="First slide" />
              </Carousel.Item>
              <Carousel.Item>
                <Image className="d-block w-100" src={'/img/slider-2.jpg'} alt="Second slide" />
              </Carousel.Item>
              <Carousel.Item>
                <Image className="d-block w-100" src={'/img/slider-2.jpg'} alt="Third slide" />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Thegames;
