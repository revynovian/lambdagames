import "../dashboard.css"
import React from "react";
import {Button, Modal, } from "react-bootstrap";

import Axios from "axios";

const DeleteGames = ({gameID, IsModalOpened, onCloseModal, isSending}) => {
  

  const accessToken = localStorage.getItem('token');
  const url = `http://localhost:3000/admin/games/delete/${gameID}`;
  
  // delete game
  const handleDelete = () => {
    Axios.delete(url, {
      headers : {
        Authorization : accessToken
      }
    }).then((res) => {
      // console.log(res.data.message)
      isSending(true)
      
      onCloseModal()
    }).catch((err) => {
      console.log(err)
    })
  }


  return (
    <>
     {/* modal section */}
          <Modal show={IsModalOpened} onHide={onCloseModal} backdrop={true} centered animation={false}>
            <Modal.Header>
              <Modal.Title>Are You Sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <strong></strong> This action can't be undone
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onCloseModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>Delete This Game</Button>
            </Modal.Footer>        
        </Modal>          
    </>
  )
}

export default DeleteGames;