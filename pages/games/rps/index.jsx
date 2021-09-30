
import React , { useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";


// import GameBoard from "../game-board";
// import LeaderBoard from "../leaderboard-table";

import { FaTrophy } from 'react-icons/fa';

// import Axios from "axios";


const RpsPage = () => {
  // const accessToken = localStorage.getItem("token");
  const API_BASE_URL = "http://localhost:3000";
  const url = API_BASE_URL+"/user/";
  const urlGames = API_BASE_URL+"/user/games/";
  const [gameList , setGameList] = useState([""])

  const [Players, setPlayers] = useState([])
  const [isLoading, setisLoading] = useState(false)

  // fetch data all player
  // useEffect (() => {
  //   Axios.get(url, {
  //     headers: {Authorization : accessToken}
  //   })
  //   .then ( res => {
  //     setisLoading(true)
  //     const data = (res.data.message)
  //     setPlayers(data)
  //   })
  //   .catch ( err => {
  //     console.log(err)
  //   });

  //   Axios.get(urlGames, {
  //     headers: { Authorization: accessToken },
  //   })
  //     .then((res) => {
  //       const gamelist = res.data.message;
  //       console.log(gamelist)
  //       setGameList(gamelist)
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // },[url,urlGames, accessToken]) 
  


  // sorting data to get rank
  // filter spesific data for leaderboard table
  // rps id = 3

  // const [ranked, setRanked] = useState([])
  // const [topPlayer, setTopPlayer] = useState("")

  // useEffect (() => {
  //   const gameID = gameList[0].id
  //   const dataNew = []
  //   Players.forEach ((e) => {
  //   const username = e.username;
  //   const city = e.User_Detail.city;
  //   const score = e.User_Scores;

  //   const scorenew = score.filter((e => {
  //     return e.game_id === gameID
  //   }))

  //   if(scorenew.length !== 0) {
  //     const tobeSort = {
  //       username,
  //       city,
  //       score : scorenew[0].score
  //     };
  //     dataNew.push(tobeSort);
  //     }
  //   })
  //   const rankedPlayers = dataNew.sort((a, b)=> (a.score < b.score) ? 1 : -1)
  //   setRanked(rankedPlayers)

  //   rankedPlayers.forEach((e,i) => {
  //     if (i === 0) {
  //       setTopPlayer(e.username)
  //     }
  //   })
  
  // }, [Players, gameList])
  



  return (
    <div style={{ backgroundImage: 'url("/img/dark-honeycomb.png")', height: "100vh"}}>
      <Container className="dashboard-custom py-5 custom-button"> 
        <Row>
          <Col>
          {/* <GameBoard 
                gameName={gameList[0].game_name} 
                gameDescription={gameList[0].description} 
                gameCover={gameList[0].cover_url}  
                gameLink={gameList[0].game_link} /> */}
          </Col>
        </Row>
        <Row>
          <h2 className="text-white">Leaderboard</h2>
          <Col md={9} className="d-flex">
            {/* <LeaderBoard isLoad={isLoading} dataPlayers={ranked}/> */}
          </Col>
          <Col md={2} className="text-center text-white mt-3">
              <Alert className="alert-custom">
                <Alert.Heading className="lead">Top #1</Alert.Heading>
                <h1><FaTrophy className="custom-icon-trophy"/></h1>
                {/* <h4>{topPlayer}</h4> */}
            </Alert>
            </Col>
          </Row>
      </Container>
    </div>
  );
};

export default RpsPage;
