import "./dashboard.css"
import React, {useState , useEffect} from "react";
import {Col, Badge, Button, Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import imagePlaceholder from "../../assets/sample-thumb.png"
import DeleteGames from "./admin/deletegames";
import UpdateGames from "./admin/updategames";

const Cards = ({isAdmin, gameID ,gameDescription, gameThumbnail, gameReady, gameName, gameLink, gameCover, isSending}) => {
  // bootstrap modal 1 -- delete games
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   // bootstrap modal 2 -- update games
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  // thumbnail image placeholder
  const [backImg, setBackImg] = useState(""); 
  useEffect (() => {
    (gameThumbnail === "N/A") ? setBackImg(imagePlaceholder) : setBackImg(gameThumbnail)
  },[gameThumbnail])

  return (
    <>
      <Col md={6} lg={3} className="my-3">
          {/* <Row className="das2-card-custom" style={{backgroundImage : `url(${gameThumbnail})` , }> */}
          <Row className="das2-card-custom" 
              style={{backgroundImage : `url(${backImg})`, borderRadius: "12px",height : "400px", width: "290px" , backgroundSize:"cover"}} >
          <Col className="p-4 das-card-custom custom-button justify-content-between d-flex flex-column">
            <h4>{gameName}</h4>
            <h5 className="small">{gameDescription}</h5>
            <div>
              {(gameReady === "ready")? 
              <Link to={gameLink}>
                <Button variant="warning">Details</Button>
              </Link> : 
                <Badge pill style={{backgroundColor: "#5D5E5E" }}>{gameReady}</Badge>}
              {(isAdmin && 
              <> 
                <Button variant="secondary" className="mx-1 " onClick={handleShow2}><FontAwesomeIcon icon={faEdit}/>Edit</Button>
                <Button variant="danger" onClick={handleShow}><FontAwesomeIcon icon={faTrash}/>Delete</Button>
              </>)}

            </div>
          </Col>
        </Row> 
      </Col>

        <UpdateGames
          gameID={gameID}
          gameName={gameName} 
          gameDescription={gameDescription} 
          gameThumbnail={gameThumbnail} 
          gameCover={gameCover} 
          gameReady={gameReady} 
          gameLink={gameLink}
          IsModalOpened={show2}
          onCloseModal={handleClose2}
          isSending={isSending}
        />

        <DeleteGames 
        isSending={isSending}
        gameID={gameID}
        IsModalOpened={show}
        onCloseModal={handleClose}/>
        
    </>
  )
}

export default Cards;