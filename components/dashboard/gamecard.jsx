import styles from "./Gamecard.module.css"
import React, {useState , useEffect} from "react";
import {Col, Badge, Button, Row} from "react-bootstrap";
import Link from "next/link";

import { FaEdit, FaTrash} from "react-icons/fa";

import DeleteGames from "../dashboard/admin/Deletegames";
import UpdateGames from "../dashboard/admin/Updategames";

const Gamecards = ({isAdmin, gameID ,gameDescription, gameThumbnail, gameReady, gameName, gameLink, gameCover, isSending}) => {
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
    (gameThumbnail === "N/A") ? setBackImg("/img/sample-ava2.png") : setBackImg(gameThumbnail)
  },[gameThumbnail])

  return (
    <>
      <Col md={6} lg={3} className="my-3">
          {/* <Row className="das2-card-custom" style={{backgroundImage : `url(${gameThumbnail})` , }> */}
          <Row className={styles.cardCustomGradient} 
              style={{backgroundImage : `url(${backImg})`, borderRadius: "12px",height : "400px", width: "290px"}} >
          <Col className={`${styles.cardCustom} p-4 custom-button justify-content-between d-flex flex-column`}>
            <h4>{gameName}</h4>
            <h5 className="small">{gameDescription}</h5>
            <div className={styles.gameCardButton}>
              {(gameReady === "ready")? 
              <Link href={gameLink} passHref>
                <Button variant="warning">Details</Button>
              </Link> : 
                <Badge badge roundend style={{backgroundColor: "#5D5E5E" }}>{gameReady}</Badge>}
              {(isAdmin && 
              <> 
                <Button variant="secondary" className="mx-1 " onClick={handleShow2}><FaEdit/>Edit</Button>
                <Button variant="danger" onClick={handleShow}><FaTrash/>Delete</Button>
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

export default Gamecards;