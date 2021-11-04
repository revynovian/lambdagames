import styles from './Profile.module.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Alert, Modal } from 'react-bootstrap';
import Axios from 'axios';
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/slices/user';
import Cookies from 'js-cookie';

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const userID = Cookies.get("userID");
  const accessToken = Cookies.get("token");

  // protected route, redirect user
  useEffect (() => {
    if(!accessToken) {
      router.push('/login')
    }
  })

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${apiUrl}user/${userID}`;
  // const urlUpdate = `${apiUrl}user/update/?id=${userID}`;
  // const urlDelete = `${apiUrl}user/delete/?id=${userID}`;
  const urlUpdate = `${apiUrl}user/update/`;
  const urlDelete = `${apiUrl}user/delete/`;

  // player-update form
  const [player, setPlayer] = useState({});
  const [playerDetail, setPlayerDetail] = useState({});
  const [password, setPassword] = useState('');

  // server response handler state
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // bootstrap modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // retrieving user data by id
  useEffect(() => {
    Axios.get(url, {
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        const basicInfo = res.data.message;
        const detailInfo = res.data.message.User_Detail;
        setPlayer(basicInfo);
        setPlayerDetail(detailInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url, accessToken]);

  // submit data to api using PUT method
  const handleUpdate = (e) => {
    e.preventDefault();

    const body = {
      username: player.username,
      email: player.email,
      password: password,
      firstname: playerDetail.firstname,
      lastname: playerDetail.lastname,
      city: playerDetail.city,
      bio: playerDetail.bio,
    };

    // console.log(body);

    Axios.put(urlUpdate, body, {
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        // console.log(res.data.message);
        setSuccess(true);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data);
        } else {
          setError('Something went wrong. Please try again later');
        }
      });
  };


  // handle deleting account
  // let history = useHistory();
  // const { logout } = useContext(myAuthContext);


  const handleDelete = (e) => {
    e.preventDefault();
    // console.log("deleted")
    Axios.delete(urlDelete, {
      headers: { Authorization: accessToken },
    })
      .then( (res) => {
        // console.log(res.data.message);
        dispatch(logout());
        router.push("/");
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 400) {
          setError(error.response.data);
        } else {
          setError('Something went wrong. Please try again later');
        }
      });
    
  }

  return (
    <div style={{ backgroundImage: `url("/img/dark-honeycomb.png")` , height: "vh-100"}}>
    <Container>
        <Row className="justify-content-center p-5">
          {/* form section */}
          <Col md={5} className={`text-white py-4 m-5 custom-button ${styles.background}`}>
            <Container>
              <h2>Personal Details</h2>
              {error && (
                <Alert className="my-3" variant={'danger'}>
                  {error}
                </Alert>
              )}
              {success && (
                <Alert className="my-3" variant={'success'}>
                  Your profile was successfully updated
                </Alert>
              )}
              <Form className="custom-form" onSubmit={handleUpdate}>
                <p className="text-muted fs-6">Basic information</p>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="email">Email Address</Form.Label>
                  <Form.Control required type="email" id="email" name="email" placeholder="Enter email" value={player.email || ''} onChange={(e) => setPlayer({ ...player, email: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <p className="text-muted fs-6">Enter your current password if you don&apos;t want to change it</p>
                  <Form.Control required type="password" id="password" name="password" placeholder="Enter new password" value={password || ''} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="username">Username</Form.Label>
                  <Form.Control required type="text" id="username" name="username" placeholder="Enter new username" value={player.username || ''} onChange={(e) => setPlayer({ ...player, username: e.target.value })} />
                </Form.Group>
                <Row className="mb-3">
                  <p className="text-muted fs-6">Additional Information</p>
                  <Form.Group as={Col}>
                    <Form.Label htmlFor="firstname">First Name</Form.Label>
                    <Form.Control type="text" id="firstname" name="firstname" placeholder="Your First Name" value={playerDetail.firstname || ''} onChange={(e) => setPlayerDetail({ ...playerDetail, firstname: e.target.value })} />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label htmlFor="lastname">Last Name</Form.Label>
                    <Form.Control type="text" id="lastname" name="lastname" placeholder="Your Last Name" value={playerDetail.lastname || ''} onChange={(e) => setPlayerDetail({ ...playerDetail, lastname: e.target.value })} />
                  </Form.Group>
                </Row>
                <Form.Group className="mb-5">
                  <Form.Label htmlFor="city">City</Form.Label>
                  <Form.Control type="text" id="city" name="city" placeholder="Enter city" value={playerDetail.city || ''} onChange={(e) => setPlayerDetail({ ...playerDetail, city: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-5">
                  <Form.Label htmlFor="bio">Bio</Form.Label>
                  <Form.Control as="textarea" rows={3} id="bio" name="bio" placeholder="short description about you" value={playerDetail.bio || ''} onChange={(e) => setPlayerDetail({ ...playerDetail, bio: e.target.value })} />
                </Form.Group>

                <Row className="mb-4">
                  <Col className="text-center">
                    <Button variant="warning" type="submit" className="ps-5 pe-5">
                      Save Changes
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </Col>

          {/* delete account section */}
          <Col md={4} className={`text-white py-4 m-5 custom-button ${styles.background}`} style={{ height: '40%' }}>
            <Container>
              <h2>Delete Your Account</h2>
              <Alert className={`mt-3 ${styles.alertCustom}`}>
                <Alert.Heading>
                  Hey, <strong className="text-warning">{player.username} </strong> Are sou sure?
                </Alert.Heading>
                <p>Deleting your account will result in removing all data and information about you from our services.</p>
                <hr />
                <p className="mb-0 text-end">
                  <Button variant="danger" type="submit" className="px-3" onClick={handleShow}>
                    Delete My Account
                  </Button>
                </p>
              </Alert>
            </Container>
          </Col>
        </Row>

        {/* modal section */}

        <Modal show={show} onHide={handleClose} backdrop={true} centered animation={false}>
            <Modal.Header>
              <Modal.Title>Are You Sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <strong>Warning !</strong> This action can&apos;t be undone
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="danger"  onClick={handleDelete}>Delete My Account</Button>
            </Modal.Footer>        
        </Modal>

        </Container>
      </div>
  );
};

export default Profile;
