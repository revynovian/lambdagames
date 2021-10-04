import React from "react";
import styles from "./GameBoard.module.css";
import {Row , Col, Button} from "react-bootstrap";
import Link from "next/link";

import { FaArrowRight } from 'react-icons/fa';

const GameBoard = (props) => {

  return (
  <>
  {/* game banner section */}
  <Row className={`mb-3 text-white p-5 mt-5 flex-column ${styles.gameCard} ${styles.customGradient}`}
      style={{backgroundImage:`url(${props.gameCover})`}}>
    <Col >
      <h2 className="text-warning">{props.gameName}</h2>
      <h5>{props.gameDescription}</h5>
    </Col>
    <Col className={`align-items-end d-flex ${styles.gameDetail_button}`}>
      <Button className="me-2" variant="secondary" disabled>
          Free to Play
        </Button>
        <Link href={`${props.gameLink}/play`} className="text-warning" passHref>
          <Button variant="warning" type="submit">
            Play Now <FaArrowRight /> 
          </Button>
        </Link>
    </Col>
  </Row>
  </>
  )
}

export default GameBoard;