import styles from "./GameXO.module.css";
import React, { useState, useEffect } from "react";

import { Container, Row, Col, Image, Modal, Button } from "react-bootstrap";
import { FaTimes, FaSave } from 'react-icons/fa';

import Axios from "axios";
import Link  from "next/link";
import Save from "../../../../components/games/savescore";
import Cookies from "js-cookie";


import { FaPlusCircle } from "react-icons/fa";

const GameXO = () => {
  // tictactoe game logic

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

  // GAME is not working yet 

  const handleChoice = (num) => {
  // const linesThatAre = (a,b,c) => {
  //   return Rules.filter(squareIndexes => {
  //     const squareValues = squareIndexes.map(index => record[index]);
  //     return JSON.stringify([a,b,c].sort()) === JSON.stringify(squareValues.sort());
  //   });
  // };
  // const playerWon = linesThatAre('x', 'x', 'x').length > 0;
  // const computerWon = linesThatAre('o', 'o', 'o').length > 0;
  // if (playerWon) {
  //   setWinner('x');
  //   setPlayerScore(playerScore + 1)
  //   setScore(newScore + 10)
  //   alert("you win!")
  // }
  // if (computerWon) {
  //   setWinner('o');
  //   setCpuScore(cpuScore + 1)
  //   alert("you lose")
  // }

  const isPlayerTurn = record.filter((e) => e !== null).length % 2 === 0;
  if(isPlayerTurn) {
    let squares = record
    squares[num]= "x"
    setRecord([...squares])
  }
  
  const emptyIndex = record
  .map((e,i)=> e === null ? i : null)
  .filter((val) => val !== null);
  
  const randomIndex = emptyIndex[Math.ceil(Math.random() * emptyIndex.length)];
  
  // console.log(isCpuTurn)
  const computerAt = index => {
    let squares = record
    squares[index]= "o";
    setRecord([...squares])
  }
  
  const isCpuTurn = record.filter((e) => e !== null).length % 2 === 1;
  
  if(isCpuTurn) {
    computerAt(randomIndex)
  }
}

const resetHandler = () => {
  setRecord(new Array(9).fill(null))
  setWinner("")
  setPlayerScore(0)
  setCpuScore(0)
}


  // fetch user data
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
      setOldScore(getScore[0].score)
      setScore(getScore[0].score)
      
    })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  }, [url, accessToken, sending]);

      
  // game section component
  const Cells =  ({num}) => {

      let selected = ""
      if (record[num] === "x") selected = styles.playerX;
      if (record[num] === "o") selected = styles.playerO;
      
      return (
        
      <td>
        <div className={`${selected} ${styles.select}`} onClick={() => handleChoice(num)}></div>
      </td>)
  }
  
  return (
    <div className={styles.gamePage}>
      <Container className="d-flex vh-100 w-75 flex-column justify-content-center pt-5" >
        
        <main className={`py-4 ${styles.gameBackground} ${styles.animationShow}`}>
        {/* 1. header-section */}
        <Row className={`${styles.gameHeader_custom} align-items-center`}>
          <Col md={1} className="text-end">
            <Link href="/games/tictactoe" passHref>
              <Image src="/img/xo/xologo.png" style={{ width: "50px", height: "50px" }} className={styles.logoButton} alt="logo"/>
            </Link>
          </Col>
          <Col  className="text-start">
            <h2 className=" fw-bold" style={{ color: "#F9B23D" }}>
              TIC TAC TOE
            </h2>
          </Col>
          <Col md={1} className="text-end">
            <Image src="/img/xo/xocoin.png" style={{ width: "50px", height: "50px" }} alt="score"/>
          </Col>
          <Col md={3} className="text-start game-header_icon ">
            <h1 className=""> {newScore} points</h1>
          </Col>
          <Col md={1} className={styles.rulesButton}>
            <Image src="/img/xo/xorules.png" style={{ width: "50px", height: "50px" }} onClick={handleShow} alt="rules"/>
          </Col>
        </Row>
        <hr />

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
        {/* 2.Game section */}
        <Row className="text-center my-2">
          <Col md={8} className="d-flex justify-content-end mb-3 " >
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
          <Col>
            <h1>Score</h1>
            <h5>dummy game</h5>
            <Button onClick={()=> setScore(newScore + 10)} variant="success" ><FaPlusCircle style={{marginBottom: "4px"}}/></Button>
            <br />
            <br />
            <Button onClick={resetHandler} variant="success">Reset</Button>
            <h1>{winner}</h1>
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
