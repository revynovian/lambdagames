import React, { useState, useEffect } from "react";
import Link from "next/link";
import Axios from "axios";
import Cookies from "js-cookie";

import styles from "./Dashboard.module.css";
import { Container, Row, Col, Button, Modal, Image} from "react-bootstrap";
import { FaCalendarAlt, FaEdit, FaMapMarkerAlt, FaImage, FaCubes } from 'react-icons/fa';

import GameCards from "../../components/dashboard/gamecard"


// / This gets called on every request
export async function getServerSideProps({req}) {
  // url constant
    const userID = req.cookies.userID;
    const accessToken = req.cookies.token;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}user/${userID}`;
    const urlGames = `${apiUrl}user/games`;
    
    // Fetch data from external API
    if (!accessToken) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
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
  // const urlImg = player.User_Detail.profile_url;
  // const urlImgCover = player.User_Detail.cover_url;
  const playerDetail = player.User_Detail;
  const [urlImg, setUrlImg] = useState(player.User_Detail.profile_url)
  const [urlImgCover, setUrlImgCover] = useState( player.User_Detail.cover_url)

  const playedGames = player.User_Scores
  // return gameid which user has played
  const playedGamesID = []
    playedGames.forEach((e) => {
      playedGamesID.push(e.game_id)
    }
  )
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
    gamePlayed={playedGamesID}
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

  useEffect(() => {
      if (!photoFile) {
          setpreviewPhoto(undefined)
          return
      }
      const objectUrl = URL.createObjectURL(photoFile)
      setpreviewPhoto(objectUrl)
      // free memory when ever this component is unmounted
      return () => {
        URL.revokeObjectURL(objectUrl)  
      }

  }, [photoFile])

  useEffect(() => {
    if (!coverFile) {
        setpreviewPhotoCover(undefined)
        return
    }
    const objectUrl2 = URL.createObjectURL(coverFile)
    setpreviewPhotoCover(objectUrl2)
    // free memory when ever this component is unmounted
    return () => {
      URL.revokeObjectURL(objectUrl2)  
    }

  }, [coverFile])


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
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const userID = Cookies.get("userID");
  const accessToken = Cookies.get("token");
  const urlUpdateImage = `${apiUrl}user/update/image/${userID}`;
    
  // upload profile to cloudinary
  const cloudinary_API = process.env.NEXT_PUBLIC_CLOUDINARY_API;
  const preset1 =  process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_PROFILE;
  const preset2 =  process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_COVER;

  const uploadImage = async () =>{    
    const data = new FormData()
    data.append("file", photoFile)
    data.append("upload_preset", preset1)
    try {
      const res = await Axios.post(cloudinary_API, data)
      const url = res.data.secure_url;
      setUrlImg(url)
      setShow(false);
      await Axios.put(urlUpdateImage, {
        profileUrl : url,
        coverUrl: urlImgCover
      },
      {headers: { Authorization: accessToken }})
    } catch(err) {
      console.log(err)
    }
  }
  // upload profile to cloudinary
  const uploadImageCover = async () =>{    
    const data = new FormData()
    data.append("file", coverFile)
    data.append("upload_preset", preset2)
    try {
      const res = await Axios.post(cloudinary_API, data)
      const url = res.data.secure_url;
      setUrlImgCover(url)
      setShowModal2(false);
      await Axios.put(urlUpdateImage, {
        profileUrl : urlImg,
        coverUrl: url
      },
      {headers: { Authorization: accessToken }})
    } catch(err) {
      console.log(err)
    }
  }

  // set image background / placeholder
  const [backImg, setBackImg] = useState("");
  const [userImg, setBackUserImg] = useState(""); 
  
  useEffect (() => {
    (!urlImgCover) ? setBackImg("/img/sample-cover2.jpg") : setBackImg(urlImgCover);
    (!urlImg) ? setBackUserImg("/img/sample-ava2.png") : setBackUserImg(urlImg);
  }, [urlImgCover, urlImg])

  return (
    <div style={{ backgroundImage: `url("/img/dark-honeycomb.png")` , minHeight: "100vh"}}>
      <Container className="py-5">
        <Row className={`justify-content-center mb-2 text-white p-4 mt-5 ${styles.profileCard}`}  style={{backgroundImage: `url(${backImg})`, backgroundSize:"cover"}}>
          <Container className={`${styles.profileCard_custom} px-4 pt-2`}>
            <Row>
            <Col md={3} className={`d-flex flex-column ${styles.profileCard_custom3}`}>
              <Image className={styles.profile} src={userImg} alt="Avatar"/>
              <Button variant="secondary" type="submit" className="mt-3 badge text-secondary" onClick={handleShow} style={{background : "transparent"}}>
                <FaImage /> change photo
              </Button>
            </Col>
            <Col md={9} className={`custom-button ${styles.profileCard_custom2}`}>
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
          {/* <h4 className="text-white">More Games Coming Soon!</h4> */}
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
