import React, { useState, useEffect } from "react";
import Link from "next/link";
import Axios from "axios";

import styles from "./Dashboard.module.css";
import { Container, Row, Col, Button, Modal, Image} from "react-bootstrap";
import { FaCalendarAlt, FaEdit, FaMapMarkerAlt, FaImage, FaCubes } from 'react-icons/fa';

import GameCards from "../../components/dashboard/Gamecard"

// import userCoverImgHolder from "../../public/img/sample-cover.png"
// import userImgHolder from "../../public/img/sample-ava.png"

// This gets called on every request
export async function getServerSideProps() {
  // url constant
  const userID = 1;
  const accessToken = "";
  const API_BASE_URL = "http://localhost:3000";
  const url = `${API_BASE_URL}/user/${userID}`;
  const urlGames = API_BASE_URL+"/user/games/";
  // const urlUpdateImage = `${API_BASE_URL}/user/update/image/${userID}`;

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
      player : playerData.message,
      gameList : gamesData.message
    } 
  }
}


const Dashboard = ({player, gameList}) => {
  

  // const [isLoading, setIsLoading] = useState(false);
  const urlImg = player.User_Detail.profile_url;
  const urlImgCover = player.User_Detail.cover_url;
  const playerDetail = player.User_Detail;

  // console.log(player)
  // console.log(gameList)


  // convert date to get player's joined date
  const getDate = new Date(player.createdAt);
  const joinDate = getDate.toLocaleString("default", { month: "long", year: "numeric" });

  // gameList Library from api
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
    isAdmin={false}
  />
  )


   // bootstrap modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // modal 2
  const [showModal2, setShowModal2] = useState(false);
  const handleClose2 = () => setShowModal2(false);
  const handleShow2 = () => setShowModal2(true);

  
  // create a previewPhoto as a side effect, whenever selected file is changed
  const [photoFile, setphotoFile] = useState()
  const [coverFile, setcoverFile] = useState()
  const [previewPhoto, setpreviewPhoto] = useState()
  const [previewPhotoCover, setpreviewPhotoCover] = useState()

//   useEffect(() => {
//       if (!photoFile) {
//           setpreviewPhoto(undefined)
//           return
//       }
//       const objectUrl = URL.createObjectURL(photoFile)
//       setpreviewPhoto(objectUrl)
//       // free memory when ever this component is unmounted
//       return () => {
//         URL.revokeObjectURL(objectUrl)  
//       }

//   }, [photoFile])

//   useEffect(() => {
//     if (!coverFile) {
//         setpreviewPhotoCover(undefined)
//         return
//     }
//     const objectUrl2 = URL.createObjectURL(coverFile)
//     setpreviewPhotoCover(objectUrl2)
//     // free memory when ever this component is unmounted
//     return () => {
//       URL.revokeObjectURL(objectUrl2)  
//     }

//   }, [coverFile])


  // select file to upload
  const onSelectFile = e => {
      if (!e.target.files || e.target.files.length === 0) {
          setphotoFile(undefined)
          return
      }
      setphotoFile(e.target.files[0])
  }
  const onSelectFileCover = e => {
    if (!e.target.files || e.target.files.length === 0) {
        setcoverFile(undefined)
        return
    }
    setcoverFile(e.target.files[0])
  }
    

  const uploadImage = async () => {    
    console.log('test')
  }
  // upload profile to cloudinary
  const uploadImageCover = async () => {    
    console.log('test')
  }

  // set image background / placeholder
  const [backImg, setBackImg] = useState("");
  const [userImg, setBackUserImg] = useState(""); 
  
  useEffect (() => {
    (!urlImgCover) ? setBackImg("/img/sample-cover.jpg") : setBackImg(urlImgCover);
    (!urlImg) ? setBackUserImg("/img/sample-ava.png") : setBackUserImg(urlImg);
  }, [urlImgCover, urlImg])

  return (
    <div style={{ backgroundImage: `url("/img/dark-honeycomb.png")` , height: "vh-100"}}>
      <Container className="py-5">
        <Row className={`justify-content-center mb-2 text-white p-4 mt-5 ${styles.profileCard}`}  style={{backgroundImage: `url(${backImg})`, backgroundSize:"cover"}}>
          <Container className={`${styles.profileCard_custom} px-4 pt-2`}>
            <Row>
            <Col md={2} className="text-center d-flex flex-column justify-content-between">
              <Image className={styles.profile} src={userImg} alt="Avatar"/>
              <Button variant="secondary" type="submit" className="mt-3 mx-auto badge text-secondary" onClick={handleShow} style={{background : "transparent"}}>
                <FaImage /> change photo
              </Button>
            </Col>
            <Col md={10} className="text-end custom-button">
              <Link passHref href="/dashboard/profile" className="text-warning">
                  <Button variant="warning" type="submit">
                    <FaEdit /> Edit Profile
                  </Button>
                </Link>
            </Col>
            </Row>
            <Col md={8} className="placeholder-glow mt-4">
              <h2 className="text-warning">{player.username}</h2>
              <h5 className="lead">{playerDetail.bio}</h5>
              <h6 className="text-muted">
                <FaMapMarkerAlt className="me-3"/>
                {playerDetail.city}
              </h6>
              <h6 className="text-muted">
                <FaCalendarAlt className="me-3" />
                {`Joined ${joinDate}`}
              </h6>
            </Col>
            <Col className="text-end">
              <Button variant="secondary" type="submit" className="mt-3 mx-4 badge text-secondary" onClick={handleShow2} style={{background : "transparent"}}>
                <FaImage /> change cover
              </Button>
            </Col>
          </Container>
        </Row>

      {/* Game List section -- static data -- can't add new game yet */}
        <Row className="my-5">
        
          <h2 className="text-white"><FaCubes /> Games Library</h2>
          <hr />
          {/* game library */}
          {gameListLibrary}
        </Row>
        <Row className="my-5">
          {/* game coming soon */}
          <h4 className="text-white">More Games Coming Soon!</h4>
        </Row>
      </Container>

      {/* modal section -- Upload Profile Picture*/}
      <Modal show={show} onHide={handleClose} backdrop={true} centered animation={false}>
            <Modal.Body className="py-5 rounded text-center">
              <h5>Update Profile</h5>
              <div className="text-white mt-5">
                {photoFile ?  <Image style={{width: "150px", height : "150px", borderRadius:"7px"}} src={previewPhoto} alt="preview-profile-photo"/> : 
                <Image style={{width: "150px", height : "150px", borderRadius:"7px"}}  src="/img/placeholder_ava.png" alt="placeholder-photo"/> }
                <label className={styles.inputFile} >
                  <span>Add Photo Profile </span>
                  <input required type="file" name="profile-image" accept="image/*" onChange={onSelectFile} />
                </label>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="warning" onClick={uploadImage} >Save</Button>
            </Modal.Footer>
        </Modal>

        {/* modal section -- Upload Cover Image */}
      <Modal show={showModal2} onHide={handleClose2} backdrop={true} centered animation={false}>
            <Modal.Body className="py-5 rounded text-center">
              <h5>Update Cover Image</h5>
              <div className="text-white mt-5">
                {photoFile ?  <Image style={{width: "400px", height : "200px", borderRadius:"7px"}} src={previewPhotoCover} alt="preview-cover-photo"/> : 
                <Image style={{width: "400px", height : "200px", borderRadius:"7px"}} src="/img/placeholder_cover.png" alt="placeholder-cover-photo" /> }
                <label className={`${styles.inputFile} m-3`} >
                  <span>Add Cover Image</span>
                  <input required type="file" name="profile-image" accept="image/*" onChange={onSelectFileCover} />
                </label>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose2}>
                Cancel
              </Button>
              <Button variant="warning" onClick={uploadImageCover} >Save</Button>
            </Modal.Footer>
        </Modal>
    </div>
  );
};

export default Dashboard;
