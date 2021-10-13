import styles from "./GameXO.module.css";
import React, { useState, useEffect } from "react";

import { Container, Row, Col, Image, Modal, Button } from "react-bootstrap";
import { FaTimes, FaSave } from 'react-icons/fa';

import Save from "../../../../components/games/savescore";

import Axios from "axios";
import Link  from "next/link";
import Cookies from "js-cookie";

const GameXO = () => {
  // ===== tictactoe game logic =====

  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  // contoh agregat skor
  // fetch from database
  const [newScore, setScore] = useState(null);
  const [oldScore, setOldScore] = useState(null);

  const [record, setRecord] = useState(new Array(9).fill(null))
  const [winner, setWinner] = useState("")

  const Rules =[
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal
    [0, 4, 8],
    [2, 4, 6]
  ]

  const [winSquare, setWinSquare] = useState([])
  const [over , setOver] = useState(false)
  // const [color , setColor] = useState("")
  const human = 'x';
  const cpu = 'o';

  const handleChoice = (num) => {
    if(!record[num]){
      turn(num, human)
      if(!checkdraw()) {
        turn(cpuPick(), cpu)
      }
    }
  }

  function emptySquare () {
    return record.map((e,i)=> e === null ? i : null).filter((val) => val !== null);
  }

  function cpuPick () {
    return emptySquare()[Math.ceil(Math.random() * emptySquare().length)];
  }

  function checkdraw () {
    if(emptySquare().length === 0) {
      setOver(true)
      setWinner("Draw")
      // setColor("#82B6D9")
    }
    return false
  }
  function turn (squareid, player) {
    let squares = record
    squares[squareid] = player
    setRecord([...squares])
    let gameWon = checkWin(record, player)
    if (gameWon) gameOver(gameWon);
  }

  function checkWin (board, player) {
    let plays = board.reduce((a, e, i) => 
      (e === player) ? a.concat(i) : a , []
    )

    let gameWon = null
    for ( let [index, win] of Rules.entries()) {
      if (win.every(e => plays.indexOf(e) > -1)) {
        gameWon = {index, player}
        break;
      }
    }
    return gameWon
  }

  function gameOver (gameWon) {
    for (let index of Rules[gameWon.index]) {
      // console.log(index)
      let win = winSquare
      win.push(index)
      setWinSquare(win)
    }
    setOver(true)
    if(gameWon.player === human) {
      setWinner("You Win")
      setScore( newScore => newScore + 10)
      setPlayerScore( score => score + 1)
      // setColor("#A0E77D")
    }
    else {
      setWinner("You Lose")
      setScore( newScore => newScore - 10)
      setCpuScore( score => score + 1)
      // setColor("#EF8677")
    }
    
  }


  const resetHandler = () => {
    setRecord(new Array(9).fill(null))
    setWinner("")
    // setPlayerScore(0)
    // setCpuScore(0)
    setWinSquare([])
    setOver(false)
  }

  // ===  fetch user data ======
  const [player, setPlayer] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // harcoded game id
  const gameID = 2;

  const userID = Cookies.get("userID");
  const accessToken = Cookies.get("token");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${apiUrl}user/${userID}`;

  const [sending , setSending] = useState(false);
   // bootstrap modal -- games rule
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   // bootstrap modal 2 -- update score
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  

  useEffect(() => {
    Axios.get(url, {
      headers: { Authorization: accessToken },
    })
    .then((res) => {
      // console.log(res.data.message)
      setIsLoading(true);
      const basicInfo = res.data.message;
      
      // get all score
      const allGameScore = res.data.message.User_Scores;
      const getScore = allGameScore.filter((e) => {
        return e.game_id === gameID
      }) 

      // get username and latest score
      setPlayer(basicInfo);
      
      // if user first time play setscore 0
      if (getScore.length === 0) {
        setOldScore(0)
        setScore(0)        
      } else {
        setOldScore(getScore[0].score)
        setScore(getScore[0].score)
      }
      
    })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  }, [url, accessToken, sending]);

      
  // game section component
  const Cells =  ({num}) => {

    let winner = ""
    if(winSquare.length !== 0) {
        winSquare.forEach((e) => {
          if (e === num) winner = styles.winner
        })
      }

      let selected = ""
      if (record[num] === "x") selected = styles.playerX;
      if (record[num] === "o") selected = styles.playerO;
      
      return (
        
      <td>
        <div className={`${selected} ${winner} ${styles.select}`} onClick={over ? null : () => handleChoice(num)}></div>
      </td>)
  }
  
  return (
    <div className={styles.gamePage}>
      <Container className={`d-flex flex-column justify-content-center pt-5  ${styles.gameContainer}`} >
        
        <main className={`py-4 my-5 ${styles.gameBackground} ${styles.animationShow}`}>
        {/* 1. header-section */}
          <Row className={`${styles.gameHeader_custom} align-items-center`}>
            <Col md={1} className="text-center">
              <Link href="/games/tictactoe" passHref>
                <Image src="/img/xo/xologo.png" style={{ width: "50px", height: "50px" }} className={styles.logoButton} alt="logo"/>
              </Link>
            </Col>
            <Col  className="text-start">
              <h2 className=" fw-bold" style={{ color: "#F9B23D" }}>
                TIC TAC TOE
              </h2>
            </Col>
            <Col md={1} className={styles.coinIcon}>
              <Image src="/img/xo/xocoin.png" style={{ width: "50px", height: "50px" }} alt="score"/>
            </Col>
            <Col md={3} className="text-start">
              <h1 className=""> {newScore} points</h1>
            </Col>
            <Col md={1} className={styles.rulesButton}>
              <Image src="/img/xo/xorules.png" style={{ width: "50px", height: "50px" }} onClick={handleShow} alt="rules"/>
            </Col>
          </Row>
          <hr />

          {/* 2. playername and score */}
          <Row >
            <Col className="text-end">
              <h1 style={{ textTransform: "capitalize" }}>{isLoading ? player.username : "player"}</h1>
            </Col>
            <Col className="text-center"> 
              <h1 style={{ fontSize: "4rem" }}>
                {playerScore}:{cpuScore}
              </h1>
            </Col>
            <Col className="text-start">
              <h1>Computer</h1>
            </Col>
          </Row>

          {/* 3a.Game section */}
          <Row className="text-center my-2">
            <Col md={8} className="d-flex justify-content-center mb-3 align-items-center " >
                <table >
                  <tbody>
                    <tr style={{borderBottom : "2px solid white"}}> 
                      <Cells num={0} />
                      <Cells num={1} />
                      <Cells num={2} />   
                    </tr>
                    <tr style={{borderBottom : "2px solid white"}}>
                      <Cells num={3}/>
                      <Cells num={4}/>
                      <Cells num={5}/>   
                    </tr>
                    <tr>
                      <Cells num={6} />
                      <Cells num={7}/>
                      <Cells num={8}/>   
                    </tr>
                  </tbody>
                </table>
            </Col>
            {/* 3b. result and reset button */}
            <Col md={2} className="d-flex flex-column justify-content-center align-items-center">
                <h1 className={`${styles.bgSelected} ${styles.bgDefault}`} style={{ color: `white`, fontSize: "2rem" }}>
                    {winner ? winner : "VS"}
                </h1>  
                <div className="py-3">
                  <Image src="/img/rps/refresh.png" alt="refresh" className={`${styles.select}`} style={{padding: "1.2rem"}} onClick={resetHandler}/>
                </div>
            </Col>
          </Row>

        {/* 4. Save button */}
          <Row >
            <Col className="text-center custom-button">
              <Button variant="warning" className="ps-5 pe-5" onClick={handleShow2}>
                <FaSave /><strong> Save</strong>
              </Button>
            </Col>
          </Row>
        </main>
      </Container>

      {/* modal save */}
      <Save
        isSending={setSending}
        dataScoreOld={oldScore}
        userID={userID}
        gameID={gameID}
        dataScore={newScore}
        IsModalOpened={show2}
        onCloseModal={handleClose2}
      />

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

export default GameXO;
