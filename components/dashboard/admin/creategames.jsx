import "../dashboard.css"
import React, {useState} from "react";
import { Button, Modal, Form, Row, Col, Alert} from "react-bootstrap";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CreateGames = ({IsModalOpened, onCloseModal , isSending}) => {
  
  const accessToken = localStorage.getItem('token');
  const url = "http://localhost:3000/admin/games/add";
  const [newGame, setNewGame] = useState({
    game_name : "",
    description: "",
    availability : "",
    game_link : "",
    thumbnail_url : "",
    cover_url: ""
  });

  const handle = (e) => {
    const gameData = { ...newGame };
    gameData[e.target.id] = e.target.value;
    setNewGame(gameData);
  };

  // Alert
  const [success, setSuccess] = useState(false);

  const handlerCreate = (e) => {
    e.preventDefault()
    console.log("test")

    Axios.post(url, newGame, {
        headers: { Authorization: accessToken },
      })
        .then((res) => {
          console.log(res.data.message)
          setSuccess(true)
          isSending(true)
        })
        .catch((error) => {
          console.log(error);
      });
  
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
              <Modal.Title>Add New Games</Modal.Title>
              <Button onClick={handleClose} variant="secondary">
                  <FontAwesomeIcon icon={faTimes} />
              </Button>
            </Modal.Header>
            <Form onSubmit={handlerCreate}>
            <Modal.Body>
                  {success && (
                    <Alert className="mx-5 my-3" variant={"success"}>
                      New game successfully created!
                    </Alert>
                  )}
                <p className="text-muted fs-6">*Required information</p>
                <Row className="flex-column m-2">
                  
                  <Col>
                  <label className="form-label">Title *</label>
                    <input required type="text" className="form-control" id="game_name" name="title" placeholder="game's name" 
                    onChange={handle} value={newGame.game_name}/>
                  </Col>

                  <Col>
                  <label className="form-label">Description *</label>
                    <textarea required className="form-control" rows="2" id="description" name="description" placeholder="short description about the game"
                    onChange={handle} value={newGame.description}></textarea>
                  </Col>

                  <Col >
                  <label className="form-label">Availibility *</label>
                    <select required className="form-select form-select-sm" id="availability" name="availability"
                    onChange={handle} value={newGame.availability}>
                    <option defaultValue>...</option>
                    <option value="ready">ready</option>
                    <option value="soon">soon</option>
                    </select>
                  </Col>

                  <Col >
                  <label className="form-label">Thumbnail</label>
                    <input className="form-control form-control-sm" type="file" id="thumbnail_url" name="thumbnail"
                    disabled/>
                  </Col>

                  <Col >
                  <label className="form-label">Cover Image</label>
                    <input className="form-control form-control-sm" type="file" id="cover_url" name="coverimage"
                    disabled/>
                  </Col>

                  <Col >
                  <label className="form-label">Games URL</label>
                  <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text">https://binargamehub.herokuapp.com</span>
                    <input type="text" className="form-control" id="game_link" name="gamelink" 
                    onChange={handle} value={newGame.game_link}/>
                  </div>
                  </Col>

                </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Cancel</Button>
              <Button variant="warning" type="submit">Save</Button>
            </Modal.Footer>        
            </Form>
        </Modal>          
    </>
  )
}

export default CreateGames;

