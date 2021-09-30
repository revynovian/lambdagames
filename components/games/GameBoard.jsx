import React from "react";
import "./game-board.css";
import {Row , Col, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const GameBoard = (props) => {

  return (
  <>
  {/* game banner section */}
  <Row className=" mb-3 text-white p-5 mt-5 game-card flex-column custom_gradient custom-header" 
      style={{backgroundImage:`url(${props.gameCover})`}}>
    <Col >
      <h2 className="text-warning">{props.gameName}</h2>
      <h5>{props.gameDescription}</h5>
    </Col>
    <Col className="align-items-end d-flex game-detail_custom-button">
      <Button className="me-2" variant="secondary" disabled>
          Free to Play
        </Button>
        <Link to={`${props.gameLink}/play`} className="text-warning">
          <Button variant="warning" type="submit">
            Play Now <FontAwesomeIcon icon={faArrowRight} /> 
          </Button>
        </Link>
    </Col>
  </Row>
  </>
  )
}

export default GameBoard;