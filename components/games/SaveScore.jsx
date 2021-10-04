import React , { useState } from "react";
import { Row, Col, Form, Button, Modal, Alert} from "react-bootstrap";


import { FaTimes } from "react-icons/fa";
import Axios from "axios";
import Cookies from "js-cookie";


const Save = ({ dataScoreOld, dataScore, gameID , userID, IsModalOpened, onCloseModal, isSending }) => {
  const accessToken = Cookies.get("token");
  const urlUpdate = `http://localhost:3000/user/score/`;
  // Alert
  const [success, setSuccess] = useState(false);
  // update curent score
  const handleUpdateScore = (e) => {
    e.preventDefault();

    const body = {
      score: dataScore,
      user_id: userID,
      game_id : gameID
    };

    Axios.put(urlUpdate, body, {
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        // console.log(res.data.message);
        setSuccess(true);
        isSending(true)
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 400 || error.response.status === 404) {
          // setError(error.response.data);
        } else {
          // setError("Something went wrong. Please try again later");
        }
      });
  };

  const handleClose =  () => {
    onCloseModal()
    setSuccess(false)
  }

  return (
    <>
      <Modal show={IsModalOpened} onHide={onCloseModal} backdrop={true} centered animation={false}>
          <Modal.Header className="custom-button">
              <Modal.Title>Submit Your Score</Modal.Title>
              <Button onClick={onCloseModal} variant="secondary">
                  <FaTimes />
              </Button>
            </Modal.Header>
            {success && (
              <Alert className="mx-5 my-3" variant={"success"}>
                Your score was successfully updated
              </Alert>
            )}
                <Form className="text-center mt-4">
            <Modal.Body>
                <Row className="flex-column m-2">
                <Row className="mb-3">
                  <Col sm={8}>
                    <Form.Label htmlFor="Score" className="col-form-label">
                      Your Last Score :
                    </Form.Label>
                  </Col>
                  <Col sm={4} style={{ position: "relative", right: "15%" }}>
                    <Form.Control type="text" id="lastScore" name="lastScore" value={dataScoreOld || "0"} readOnly />
                  </Col>
                </Row>

              {/* curent score */}
                  <Row className="mb-3">
                    <Col sm={8}>
                      <Form.Label htmlFor="Score" className="col-form-label">
                        Your Curent Score :
                      </Form.Label>
                    </Col>
                    <Col sm={4} style={{ position: "relative", right: "15%" }}>
                      <Form.Control type="text" id="curentScore" name="curentScore" value={dataScore || "0"} readOnly />
                    </Col>
                  </Row>
                </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Play Again?
              </Button>
              <Button variant="warning" onClick={handleUpdateScore}>Submit</Button>
            </Modal.Footer>        
            </Form>
        </Modal>
    </>
  );
};

export default Save;
