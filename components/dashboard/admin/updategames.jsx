import React , {useState } from "react";
import {Button, Modal,Row, Col, Alert } from "react-bootstrap";

import { FaTimes } from "react-icons/fa";

import Axios from "axios";
import Cookies from "js-cookie";

const UpdateGames = (
  {gameID ,
  gameDescription, 
  gameThumbnail, 
  gameReady, gameName, 
  gameLink, 
  gameCover,
  IsModalOpened, 
  onCloseModal,
  isSending}) => {

  const accessToken = Cookies.get('token');
  const url = `http://localhost:3000/admin/games/update/${gameID}`;
  
  const [updateGame, setUpdateGame] = useState({
    game_name : gameName,
    description: gameDescription,
    thumbnail_url: gameThumbnail,
    cover_url : gameCover,
    availability : gameReady,
    game_link : gameLink
  });

  const handle = (e) => {
    const gameData = { ...updateGame };
    gameData[e.target.id] = e.target.value;
    setUpdateGame(gameData);
  };

  // Alert
  const [success, setSuccess] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault()
    console.log("test")

    try {  
      const bodyRequest = {
        game_name : updateGame.game_name,
        description: updateGame.description,
        thumbnail_url: "",
        cover_url : "",
        availability : updateGame.availability,
        game_link : updateGame.game_link
      }
  
      await Axios.put(url, bodyRequest, {
        headers: { Authorization: accessToken },
      })
        .then((res) => {
          setSuccess(true)
          isSending(true)
          console.log(res.data.message)
        })
        .catch((error) => {
          console.log(error);
      });

    }catch (err){
      console.log(err)
    }
  }

  const handleClose =  () => {
    onCloseModal()
    setSuccess(false)
  }

  return (
    <>
     {/* modal section */}
          <Modal show={IsModalOpened} onHide={handleClose} backdrop={true} centered animation={false}>
            <Modal.Header className="custom-button">
              <Modal.Title>Edit Game Details</Modal.Title>
              <Button onClick={handleClose} variant="secondary">
                  <FaTimes />
              </Button>
            </Modal.Header>
            <Modal.Body>
                {success && (
                    <Alert className="mx-5 my-3" variant={"success"}>
                      The game successfully updated!
                    </Alert>
                  )}
              <p className="text-muted fs-6">*Required information</p>
                <Row className="flex-column m-2">

                  <Col>
                  <label className="form-label">Title *</label>
                    <input required type="text" className="form-control" id="game_name" name="title" placeholder="game's name" 
                    onChange={handle} value={updateGame.game_name}/>
                  </Col>

                  <Col>
                  <label className="form-label">Description *</label>
                    <textarea required className="form-control" rows="2" id="description" name="description" placeholder="short description about the game"
                    onChange={handle} value={updateGame.description}></textarea>
                  </Col>

                  <Col >
                  <label className="form-label">Availibility *</label>
                    <select required className="form-select form-select-sm" id="availability" name="availability"
                    onChange={handle} value={updateGame.availability}>
                    <option defaultValue>...</option>
                    <option value="ready">ready</option>
                    <option value="soon">soon</option>
                    </select>
                  </Col>

                  <Col >
                  <label className="form-label">Thumbnail</label>
                    <input className="form-control form-control-sm" type="file" id="thumbnail_url" name="thumbnail"
                   />
                  </Col>

                  <Col >
                  <label className="form-label">Cover Image</label>
                    <input className="form-control form-control-sm" type="file" id="cover_url" name="coverimage"
                    />
                  </Col>

                  <Col >
                  <label className="form-label">Games URL</label>
                  <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text">https://binargamehub.herokuapp.com</span>
                    <input type="text" className="form-control" id="game_link" name="gamelink" 
                    onChange={handle} value={updateGame.game_link}/>
                  </div>
                  </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="warning" onClick={handleUpdate}>Save</Button>
            </Modal.Footer>        
        </Modal>          
    </>
  )
}

export default UpdateGames;