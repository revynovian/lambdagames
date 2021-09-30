import styles from "./Gamerps.module.css";
import React, { useState, useEffect } from "react";
// import rock from "../../../assets/batu.png";
// import paper from "../../../assets/kertas.png";
// import scissors from "../../../assets/gunting.png";
// import refresh from "../../../assets/refresh.png";
// import logo from "../../../assets/logo.png";
// import info from "../../../assets/info.png";
// import coin from "../../../assets/goldcoin.png";
// import rules from "../../../assets/rules.png";
import { Container, Row, Col, Image, Modal, Button } from "react-bootstrap";
import { FaTimes, FaSave } from 'react-icons/fa';

// import Axios from "axios";
import Link  from "next/link";
// import Save from "../save/Save";

const GameRPS = () => {
  // rps game logic
  const [playerHands, setPlayerHands] = useState(null);
  const [cpuHands, setCpuHands] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [result, setResult] = useState(null);
  // contoh agregat skor
  // fetch from database
  const [newScore, setScore] = useState(null);
  const [oldScore, setOldScore] = useState(null);
  const [color , setColor] = useState("")

  const CHOICES = [
    {
      choice: "rock",
      beats: "scissor",
      losesTo: "paper",
    },
    {
      choice: "paper",
      beats: "rock",
      losesTo: "scissor",
    },
    {
      choice: "scissor",
      beats: "paper",
      losesTo: "rock",
    },
  ];

  const cpuPick = () => {
    return CHOICES[Math.floor(Math.random() * CHOICES.length)].choice;
  };

  const handleClick = (playerPick, cpuPick) => {
    setPlayerHands(playerPick);
    setCpuHands(cpuPick);
    const getResult = compareResult(playerPick, cpuPick);
    setResult(getResult);
    // console.log(getResult);
  };
  const compareResult = (player, cpu) => {
    let item = 0;
    for (item in CHOICES) {
      if (cpu === CHOICES[item].choice) {
        if (CHOICES[item].losesTo.includes(player)) {
          setPlayerScore(playerScore + 1);
          // calculate score(simple scoring => win + 10 pts)
          setScore(newScore + 10);
          setColor("#A0E77D")
          return "YOU WIN";
        } else if (CHOICES[item].beats.includes(player)) {
          setCpuScore(cpuScore + 1);
          // calculate score(simple scoring => lose - 5 pts)
          setScore(newScore - 5);
          setColor("#EF8677")
          return "YOU LOSE";
        } else {
          setColor("#82B6D9")
          return "DRAW";
        }
      }
    }
  };

  const refreshClick = () => {
    // reset score
    setPlayerScore(0);
    setCpuScore(0);
    setPlayerHands(null);
    setCpuHands(null);
    setResult(null);
  };

  // fetch user data
  const [player, setPlayer] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [gameID, setGameID] = useState("");
  // const userID = localStorage.getItem("userID");
  // const accessToken = localStorage.getItem("token");
  // const url = `http://localhost:3000/user/${userID}`;

  const [sending , setSending] = useState(false);
   // bootstrap modal -- games rule
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   // bootstrap modal 2 -- update score
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  

  // useEffect(() => {
  //   Axios.get(url, {
  //     headers: { Authorization: accessToken },
  //   })
  //     .then((res) => {
  //       // console.log(res.data.message)
  //       setIsLoading(true);
  //       const basicInfo = res.data.message;
  //       // fix game ID later
  //       const scorePlayer = res.data.message.User_Scores[0].score;
  //       const gameid = res.data.message.User_Scores[0].game_id;
  //       // const detailInfo = res.data.message.User_Detail
  //       setPlayer(basicInfo);
  //       setScore(scorePlayer);
  //       setOldScore(scorePlayer);
  //       setGameID(gameid);
  //       // setPlayerDetail(detailInfo)
  //       // console.log(res);\
        
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   setIsLoading(false);
  // }, [url, accessToken, sending]);


  return (
    <div className={styles.gamePage}>
      <Container className="d-flex vh-100 w-75 flex-column justify-content-center pt-5" >
        
        <main className={`py-4 ${styles.gameBackground} ${styles.animationShow}`}>
        {/* 1. header-section */}
        <Row className={`${styles.gameHeader_custom} align-items-center`}>
          <Col md={1} className="text-end">
            <Link href="/games/rps" passHref>
              <Image src="/img/rps/logo.png" style={{ width: "50px", height: "50px" }} className={styles.logoButton} alt="logo"/>
            </Link>
          </Col>
          <Col  className="text-start">
            <h2 className=" fw-bold" style={{ color: "#F9B23D" }}>
              ROCK PAPER SCISSORS
            </h2>
          </Col>
          <Col md={1} className="text-end">
            <Image src="/img/rps/goldcoin.png" style={{ width: "50px", height: "50px" }} alt="score"/>
          </Col>
          <Col md={3} className="text-start game-header_icon ">
            <h1 className=""> {newScore} points</h1>
          </Col>
          <Col md={1} className={styles.rulesButton}>
            <Image src="/img/rps/info.png" style={{ width: "50px", height: "50px" }} onClick={handleShow} alt="rules"/>
          </Col>
        </Row>
        <hr />

        {/* 2.Game section */}
        <Row className={`justify-content-center text-center my-4 ${styles.gameSection_custom}`}>
          {/* player section */}
          <Col sm={4} className={`d-flex flex-column align-items-center  ${styles.gameSection_player}`}>
            <h1 style={{ textTransform: "capitalize" }}>{isLoading ? player.username : "player"}</h1>
            <Image src="/img/rps/batu.png" alt="batu" id="batu" style={{ width: "90px", height: "90px" }} onClick={() => handleClick("rock", cpuPick())} className={playerHands === "rock" ? `${styles.bgSelected}` : ""} />
            <Image src="/img/rps/kertas.png" alt="kertas" id="kertas" style={{ width: "90px", height: "90px" }} onClick={() => handleClick("paper", cpuPick())} className={playerHands === "paper" ? `${styles.bgSelected}` : ""} />
            <Image src="/img/rps/gunting.png" alt="gunting" id="gunting" style={{ width: "90px", height: "90px" }} onClick={() => handleClick("scissor", cpuPick())} className={playerHands === "scissor" ? `${styles.bgSelected}` : ""} />
          </Col>
           {/* result section */}
          <Col sm={2} className="d-flex flex-column align-items-center justify-content-between">
            <h1 style={{ fontSize: "4rem" }}>
              {playerScore}:{cpuScore}
            </h1>
            <h1 className={`${styles.bgSelected} ${styles.bgDefault}`} style={{ color: `${color}`, fontSize: "2rem" }}>
              {result ? result : "VS"}
            </h1>
            <Image src="/img/rps/refresh.png" alt="refresh" id="refresh" style={{ width: "90px", height: "90px" }} onClick={() => refreshClick()} className={styles.resetButton} />
          </Col>
          {/* cpu section */}
          <Col sm={4} className="d-flex flex-column align-items-center">
            <h1>Computer</h1>
            <Image src="/img/rps/batu.png" alt="batu-cpu" id="batu-cpu" style={{ width: "90px", height: "90px" }} className={cpuHands === "rock" ? `${styles.bgSelected}` : ""} />
            <Image src="/img/rps/kertas.png" alt="kertas-cpu" id="kertas-cpu" style={{ width: "90px", height: "90px" }} className={cpuHands === "paper" ? `${styles.bgSelected}` : ""} />
            <Image src="/img/rps/gunting.png" alt="gunting-cpu" id="gunting-cpu" style={{ width: "90px", height: "90px" }} className={cpuHands === "scissor" ? `${styles.bgSelected}` : ""} />
          </Col>
        </Row>

          {/* 3. Save button */}
        <Row>
          <Col className="d-flex flex-column align-items-center mb-3 custom-button">
            <Button variant="warning" className="ps-5 pe-5" onClick={handleShow2}>
            <FaSave /><strong> Save</strong>
            </Button>
          </Col>
        </Row>
        </main>
      </Container>

      {/* modal save */}
      {/* <Save
        isSending={setSending}
        dataScoreOld={oldScore}
        userID={userID}
        gameID={gameID}
        dataScore={newScore}
        IsModalOpened={show2}
        onCloseModal={handleClose2}
      /> */}

      {/* modal section - game rules */}
      <Modal show={show} onHide={handleClose} backdrop={true} centered animation={false} className={"custom-button"}>
        <Modal.Header>
          <Modal.Title>Rules</Modal.Title>
          <Button onClick={handleClose} variant="secondary">
            <FaTimes />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Container className="d-flex justify-content-center pb-5">
            <Image src="/img/rps/rules.png" style={{ width: "250px", height: "324px" }} alt=""/>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GameRPS;
