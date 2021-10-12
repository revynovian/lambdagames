import React , {useEffect , useState} from "react";

import Axios from "axios";

import styles from "./Admin.module.css";

import { Container, Row,Col, Alert, Button} from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";

import GameCards from "../../../components/dashboard/gamecard"
import CreateGames from "../../../components/dashboard/admin/creategames"
import Cookies from "js-cookie";


const AdminDashboard = () => {
  const userID = Cookies.get("userID");
  const accessToken = Cookies.get("token");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  const urlData = `${apiUrl}user/${userID}`;
  const urlUsers =`${apiUrl}admin`;
  const urlGames = `${apiUrl}admin/games/`;
  

  const [gameList , setGameList] = useState([])
  const [player, setPlayer] = useState({});
  const [Allplayer, setAllPlayer] = useState([]);
  const [playerScore, setPlayerScore] = useState([]);

  const [sending , setSending] = useState(false);
  // fetch username and all players
  useEffect(() => {
    Axios.get(urlUsers, {
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        const data = res.data.message;
        setAllPlayer(data);
      })
      .catch((error) => {
        console.log(error);
      });

    Axios.get(urlData, {
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        const basicInfo = res.data.message;
        setPlayer(basicInfo);
      })
      .catch((error) => {
        console.log(error);
      });

      Axios.get(urlGames, {
        headers: { Authorization: accessToken },
      })
        .then((res) => {
          const gamelist = res.data.message;
          // console.log(gamelist)
          setGameList(gamelist)
        })
        .catch((error) => {
          console.log(error);
        });
      
        return setSending(false)
  }, [urlData, urlUsers,urlGames, accessToken, sending]);


    // const playedGames = player.User_Scores
    // return gameid which user has played
    const playedGamesID = []
      playerScore.forEach((e) => {
        playerScore.push(e.game_id)
      }
    )
  // gameList Library
    const gameListLibrary = gameList.map((e) => 
    <GameCards
    key={e.id}
    gameID={e.id}
    gameName={e.game_name} 
    gameDescription={e.description} 
    gameThumbnail={e.thumbnail_url} 
    gameCover={e.cover_url} 
    gameReady={e.availability} 
    gameLink={e.game_link}
    isAdmin={true}
    isSending={setSending}
    gamePlayed={playedGamesID}
    />
  )

    // bootstrap modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // console.log(show)

  return (
    <div style={{backgroundImage: `url("/img/dark-honeycomb.png")`, color:"white"}}>
      <Container className="py-5 custom-button">
        <Row className="py-5 ">
          <Col md={5}>
            <Alert className={styles.alertCustom}>
              <Alert.Heading className="lead text-white">Hey, nice to see you</Alert.Heading>
              <h4>Welcome, <strong>{player.username}</strong> !</h4>
              <hr />
              <h5 className="text-muted">Admin Dashboard</h5>
          </Alert>
          </Col>
          <Col md={2} className="text-center">
            <Alert className={styles.alertCustom}>
              <Alert.Heading className="lead text-white">Registered User</Alert.Heading>
              <hr />
              <h2>{Allplayer.length}</h2>
          </Alert>
          </Col>
          <Col md={2} className="text-center">
            <Alert className={styles.alertCustom}>
              <Alert.Heading className="lead text-white">Active User</Alert.Heading>
              <hr />
              <h2>{Allplayer.length}</h2>
          </Alert>
          </Col>
          <Col md={2} className="text-center">
            <Alert className={styles.alertCustom}>
              <Alert.Heading className="lead text-white">Games</Alert.Heading>
              <hr />
              <h2>{gameList.length}</h2>
          </Alert>
          </Col>
        </Row>
      
        
      {/* modal create games */}
          <Button variant="warning" onClick={handleShow}><FaPlusCircle/> Add Games </Button>
          <CreateGames
            isSending={setSending} 
            IsModalOpened={show}
            onCloseModal={handleClose}
          />
        
       {/* Game List section */}
        <Row className="my-5">
          <h4 className="text-muted">Games Library</h4>
          {gameListLibrary}
        </Row>
        <Row>
          <Col >
          <h4 className="text-muted">Player Database</h4>
            <table className={`mb-5 mt-3 ${styles.tableCustom}`}>
              <thead style={{color: "#FFCA2C"}}>
                <tr>
                  <th style={{width : "8%"}}>No</th>
                  <th>Username</th>
                  <th>City</th>
                  <th>Join Date</th>
                </tr>
              </thead>
              <tbody>
                {Allplayer.map((item, index) => {
                  const date = new Date(item.createdAt)
                  return (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{item.username}</td>
                      <td>{item.User_Detail.city}</td>
                      <td>{date.toLocaleDateString()}</td>
                    </tr>
                  )})}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>

    </div>
  );
};

export default AdminDashboard;
