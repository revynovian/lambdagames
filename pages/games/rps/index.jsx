
import React , { useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";


import GameBoard from "../../../components/games/GameBoard";
import LeaderBoard from "../../../components/games/Leaderboard";

import { FaTrophy } from 'react-icons/fa';
import styles from "../Games.module.css";

import Axios from "axios";


// This gets called on every request
export async function getServerSideProps({req}) {
  // url constant
  const accessToken = req.cookies.token;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${apiUrl}user`;
  const urlGames = `${apiUrl}user/games`;
  
  // redirect if user doesnt have token
  if (!accessToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  // Fetch data from external API
  const {data : playerData} = await Axios.get(url, {
      headers: { Authorization: accessToken },
    })
  
  const {data : gamesData} = await Axios.get(urlGames, {
    headers: { Authorization: accessToken },
  })

  // Pass data to the page via props
  return { 
    props: { 
      playerAll : playerData.message,
      gameList : gamesData.message
    } 
  }
  
}

const RpsPage = ({playerAll, gameList}) => {
  const [isLoading, setisLoading] = useState(true)
  // sorting data to get rank
  // filter spesific data for leaderboard table
  // rps id = 1
  const gameID = 1
  const dataNew = []

    playerAll.forEach((e) => {
    const username = e.username;
    const city = e.User_Detail.city;
    const score = e.User_Scores;

    const scorenew = score.filter((e => {
      return e.game_id === gameID
    }))

    if(scorenew.length !== 0) {
      const tobeSort = {
        username,
        city,
        score : scorenew[0].score
      };

      dataNew.push(tobeSort)
    }
  })
  
  // sorted data
  const rankedPlayers = dataNew.sort((a, b)=> (a.score < b.score) ? 1 : -1)
  
  // get top 1 player
  let topPlayer = "";
  rankedPlayers.forEach((e,i) => {
      if (i === 0) {
        topPlayer = e.username
      }
    })
  

  return (
    <div style={{ backgroundImage: 'url("/img/dark-honeycomb.png")', height: "100vh"}}>
      <Container className="py-5 custom-button"> 
        <Row>
          <Col>
          {/* rps index is 0 */}
          <GameBoard 
            gameName={gameList[0].game_name} 
            gameDescription={gameList[0].description} 
            gameCover={gameList[0].cover_url}  
            gameLink={gameList[0].game_link} />
          </Col>
        </Row>
        <Row>
          <h2 className="text-white">Leaderboard</h2>
          <Col md={9} className="d-flex">
            <LeaderBoard isLoad={isLoading} dataPlayers={rankedPlayers}/>
          </Col>
          <Col md={2} className="text-center text-white mt-3">
              <Alert className={styles.alertCustom}>
                <Alert.Heading className="lead">Top #1</Alert.Heading>
                <h1><FaTrophy /></h1>
                <h4>{topPlayer}</h4>
            </Alert>
            </Col>
          </Row>
      </Container>
    </div>
  );
};

export default RpsPage;
