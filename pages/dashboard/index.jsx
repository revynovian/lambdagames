import React, { useState, useEffect } from "react";
import Link from "next/link";
// import Axios from "axios";

import styles from "./Dashboard.module.css";
import { Container, Row, Col, Button, Modal, Image} from "react-bootstrap";
import { FaCalendarAlt, FaEdit, FaMapMarkerAlt, FaImage, FaCubes } from 'react-icons/fa';

// import GameCards from "../dashboard/gamecard"

// import userCoverImgHolder from "../../assets/sample-cover.jpg"
// import userImgHolder from "../../assets/sample-ava.png"

const Dashboard = () => {
  // const userID = localStorage.getItem("userID");
  // const accessToken = localStorage.getItem("token");
  const API_BASE_URL = "http://localhost:3000";
  // const url = `${API_BASE_URL}/user/${userID}`;
  // const urlUpdateImage = `${API_BASE_URL}/user/update/image/${userID}`;
  const urlGames = API_BASE_URL+"/admin/games/";
  
  const [gameList , setGameList] = useState([])
  const [player, setPlayer] = useState({});
  const [playerDetail, setPlayerDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [urlImg, setUrlImg] = useState("")
  const [urlImgCover, setUrlImgCover] = useState("")

  // useEffect(() => {
  //   Axios.get(url, {
  //     headers: { Authorization: accessToken },
  //   })
  //     .then((res) => {
  //       // console.log(res.data.message)
  //       setIsLoading(true);
  //       const basicInfo = res.data.message;
  //       const detailInfo = res.data.message.User_Detail;
  //       const profileImg = res.data.message.User_Detail.profile_url;
  //       const coverImg = res.data.message.User_Detail.cover_url;
  //       // console.log(imgInfo);
  //       setPlayer(basicInfo);
  //       setPlayerDetail(detailInfo);
  //       setUrlImg(profileImg);
  //       setUrlImgCover(coverImg);
        
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //     Axios.get(urlGames, {
  //       headers: { Authorization: accessToken },
  //     })
  //       .then((res) => {
  //         const gamelist = res.data.message;
  //         // console.log(gamelist)
  //         setGameList(gamelist)
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  // }, [url,urlGames, accessToken]);

  // convert date to get player's joined date
  const getDate = new Date(player.createdAt);
  const joinDate = getDate.toLocaleString("default", { month: "long", year: "numeric" });

  // gameList Library from api
  // const gameListLibrary = gameList.map((e) => 
  // <GameCards
  //   key={e.id}
  //   gameID={e.id}
  //   gameName={e.game_name} 
  //   gameDescription={e.description} 
  //   gameThumbnail={e.thumbnail_url} 
  //   gameCover={e.cover_url} 
  //   gameReady={e.availability} 
  //   gameLink={e.game_link}
  //   isAdmin={false}
  // />
  // )


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
    
  // upload profile to cloudinary
  const cloudinary_API = "https://api.cloudinary.com/v1_1/revynovian/image/upload";

  const uploadImage = async () =>{    
    const data = new FormData()
    data.append("file", photoFile)
    data.append("upload_preset", "binar-profileimg")
    try {
      const res = await Axios.post(cloudinary_API, data)
      const url = res.data.secure_url;
      setUrlImg(url)
      setShow(false);
      await Axios.put(urlUpdateImage, {
        profileUrl : url,
        coverUrl: urlImgCover
      })
    } catch(err) {
      console.log(err)
    }
  }
  // upload profile to cloudinary
  const uploadImageCover = async () =>{    
    const data = new FormData()
    data.append("file", coverFile)
    data.append("upload_preset", "binar-coverimg")
    try {
      const res = await Axios.post(cloudinary_API, data)
      const url = res.data.secure_url;
      setUrlImgCover(url)
      setShow(false);
      await Axios.put(urlUpdateImage, {
        profileUrl : urlImg,
        coverUrl: url
      })
    } catch(err) {
      console.log(err)
    }
  }

  // set image background / placeholder
  const [backImg, setBackImg] = useState("");
  const [userImg, setBackUserImg] = useState(""); 
  
  // useEffect (() => {
  //   (!urlImgCover) ? setBackImg(userCoverImgHolder) : setBackImg(urlImgCover);
  //   (!urlImg) ? setBackUserImg(userImgHolder) : setBackUserImg(urlImg);
  // }, [urlImgCover, urlImg])

  return (
    <div style={{ backgroundImage: `url("/img/dark-honeycomb.png")` , height: "vh-100"}}>
      <Container className="py-5">
        <Row className="justify-content-center mb-2 text-white p-4 mt-5 profile-card"  style={{backgroundImage: `url(${backImg})`, backgroundSize:"cover"}}>
          <Container className="profile-card-custom px-4 pt-2">
            <Row>
            <Col md={2} className="text-center d-flex flex-column justify-content-between">
              <Image className="profile" src={userImg} alt="Avatar"/>
              <Button variant="secondary" type="submit" className="mt-3 mx-4 badge text-secondary" onClick={handleShow} style={{background : "transparent"}}>
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
              <h2 className="text-warning">{isLoading ? player.username : <span className="text-muted rounded placeholder col-4" />}</h2>
              <h5 className="lead">{isLoading ? playerDetail.bio : <span className="text-muted rounded placeholder col-4" />}</h5>
              <h6 className="text-muted">
                <FaMapMarkerAlt className="me-3"/>
                {isLoading ? playerDetail.city : <span className="rounded placeholder col-3" />}
              </h6>
              <h6 className="text-muted">
                <FaCalendarAlt className="me-3" />
                {isLoading ? `Joined ${joinDate}` : <span className="rounded placeholder col-3" />}
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
          {/* {gameListLibrary} */}
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
                <label className="custom-imput-file" >
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
                <label className="custom-imput-file m-3" >
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
