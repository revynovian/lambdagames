import React , {useEffect , useState} from "react";
// import { Link } from "react-router-dom";
import Axios from "axios";

import "../dashboard.css";
import "./admin.css";
import { Container, Row,Col, Alert, Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import GameCards from "../gamecard"
import backpattern from "../../../assets/dark-honeycomb.png";
import CreateGames from "./creategames"

const Dashboard = () => {
  const userID = localStorage.getItem("userID");
  const accessToken = localStorage.getItem("token");
  const API_BASE_URL = "http://localhost:3000";
  const urlGames = API_BASE_URL+"/admin/games/";
  const urlData = `${API_BASE_URL}/user/${userID}`;
  const urlUsers = API_BASE_URL+"/admin/";

  const [gameList , setGameList] = useState([])
  const [player, setPlayer] = useState({});
  const [Allplayer, setAllPlayer] = useState([]);

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
    />
  )

    // bootstrap modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // console.log(show)

  return (
    <div style={{backgroundImage: `url(${backpattern})`, color:"white"}}>
      <Container className="dashboard-custom py-5  custom-button">
        <Row className="py-5">
          <Col md={5}>
            <Alert className="alert-custom">
              <Alert.Heading className="lead">Hey, nice to see you</Alert.Heading>
              <h4>Welcome, <strong>{player.username}</strong> !</h4>
              <hr />
              <h5 className="text-muted">Admin Dashboard</h5>
          </Alert>
          </Col>
          <Col md={2} className="text-center">
            <Alert className="alert-custom">
              <Alert.Heading className="lead">Registered User</Alert.Heading>
              <hr />
              <h2>{Allplayer.length}</h2>
          </Alert>
          </Col>
          <Col md={2} className="text-center">
            <Alert className="alert-custom">
              <Alert.Heading className="lead">Active User</Alert.Heading>
              <hr />
              <h2>{Allplayer.length}</h2>
          </Alert>
          </Col>
          <Col md={2} className="text-center">
            <Alert className="alert-custom">
              <Alert.Heading className="lead">Games</Alert.Heading>
              <hr />
              <h2>{gameList.length}</h2>
          </Alert>
          </Col>
        </Row>
      
        
      {/* modal create games */}
          <Button variant="warning" onClick={handleShow}><FontAwesomeIcon icon={faPlusCircle}/> Add Games </Button>
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
          <h4 className="text-muted">Player Database</h4>
        <table className="mb-5 mt-3 custom-table">
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

        </Row>
      </Container>

    </div>
  );
};

export default Dashboard;
