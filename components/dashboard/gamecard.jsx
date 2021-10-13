import styles from "./Gamecard.module.css"
import React, {useState , useEffect} from "react";
import {Col, Button, Row, Modal} from "react-bootstrap";
import Link from "next/link";

import {
  FacebookShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";

import { 
  FaEdit,
  FaTrash, 
  FaShareAlt, 
  FaFacebookF, 
  FaTelegramPlane, 
  FaTwitter, 
  FaRedditAlien 
} from "react-icons/fa";

import DeleteGames from "./admin/deletegames";
import UpdateGames from "./admin/updategames";

const Gamecards = (
  { isAdmin, 
    gameID ,
    gameDescription, 
    gameThumbnail, 
    gameReady, 
    gameName, 
    gameLink, 
    gameCover, 
    isSending,
    gamePlayed }) => {

  // bootstrap modal 1 -- delete games
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   // bootstrap modal 2 -- update games
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

   // bootstrap modal 3 -- share button
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const shareUrl = `https://challenge-chapter-10.vercel.app/${gameLink}`;
  // thumbnail image placeholder
  const [backImg, setBackImg] = useState(""); 
  useEffect (() => {
    (gameThumbnail === "N/A") ? setBackImg("/img/sample-ava2.png") : setBackImg(gameThumbnail)
  },[gameThumbnail])

  return (
    <>
      <Col md={6} lg={3} className="my-3">
          <Row className={styles.cardCustomGradient} 
              style={{backgroundImage : `url(${backImg})`, borderRadius: "12px",height : "400px", width: "290px"}} >
            {/* badge info */}
            <div style={{position : "absolute", width: "0px"}}>
              {gamePlayed.includes(gameID) ? 
                <div className={styles.infoPlayed}></div> : 
                <div className={styles.notPlayed}></div>}
            </div>
          <Col className={`${styles.cardCustom} p-4 custom-button justify-content-between d-flex flex-column`}>
              {/* card body */}
            <Row>
              <Col md={7}><h4>{gameName}</h4></Col>
              <Col className="justify-content-end d-flex">
                <div className={styles.shareButton} onClick={handleShow3}>
                  share <FaShareAlt />
                </div>
              </Col>
            </Row>
            <h5 className="small text-secondary">{gameDescription}</h5>
              {/* card button */}
            <div className={styles.gameCardButton}>
              {(gameReady === "ready")? 
              <Link href={gameLink} passHref>
                <Button variant="warning">Details</Button>
              </Link> : 
                <Button disabled>{gameReady}</Button>}
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
        
        {/* share button modal */}
        <Modal show={show3} onHide={handleClose3} backdrop={true} centered animation={false}>
            <Modal.Body className="py-3 rounded">
              <Row className="pb-3">
                <Col md={10}>
                  <h5>Share with your friends!</h5>
                </Col>
                <Col md={2} className="justify-content-end d-flex">
                  <button onClick={handleClose3} className={styles.shareButton}>x</button>
                </Col>
              </Row>
              <Row>
                <Col className={styles.socialButton}>
                  <FacebookShareButton url={shareUrl}> 
                    <FaFacebookF style={{fontSize :"2rem"}}/> facebook
                  </FacebookShareButton>
                </Col>
                <Col className={styles.socialButton}>
                <TwitterShareButton url={shareUrl}> 
                  <FaTwitter style={{fontSize :"2rem"}}/> twitter
                </TwitterShareButton>
                </Col>
                <Col className={styles.socialButton}>
                <RedditShareButton url={shareUrl}> 
                  <FaRedditAlien style={{fontSize :"2rem"}}/> reddit
                </RedditShareButton>
                </Col>
                <Col className={styles.socialButton}>
                  <TelegramShareButton url={shareUrl}> 
                    <FaTelegramPlane style={{fontSize :"2rem"}}/> telegram
                  </TelegramShareButton>
                </Col>
              </Row>
            </Modal.Body>
        </Modal>

    </>
  )
}

export default Gamecards;