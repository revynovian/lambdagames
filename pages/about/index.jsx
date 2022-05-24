import styles from "./Aboutpage.module.css";
import { Container, Row, Col, Image} from "react-bootstrap";
import ReactPlayer from "react-player";

const About = () => {

  return (
    <div>
      <Container fluid className={`${styles.aboutPage} p-5 d-flex justify-content-center`}>
        <Row className={`text-white p-2 py-5 mt-5 text-center justify-content-center align-items-center ${styles.background}`}>
          <Col md={3}>
            <div>
            <Image src="/img/logobig.png" style={{width: "65px", height: "70px" ,margin: "10px"}} alt="logo-icon"/>
            <h3 className="display-6">LAMBDA GAMES</h3>
            <h4 className="lead">The best place to play browser games</h4>
            <hr />
            <h6>tech stack</h6>
              <Image src="/img/icon-next.png" style={{width: "50px", height: "50px" ,margin: "10px"}} alt="next-icon"/>
              <Image src="/img/icon-bootstrap.png" style={{width: "50px", height: "50px",margin: "10px"}} alt="bootstrap-icon" />
              <Image src="/img/icon-pg.png" style={{width: "50px", height: "50px", margin:"10px" }} alt="postgresql-icon"/>
            <hr />
            <h6>twitter.com/revynovian</h6>
            </div>
          </Col>
          <Col md={1}>
            <div>
              <div className={styles.vl}></div>
            </div>
          </Col>
          <Col md={7} sm={12} className='py-5'>
            <div className={styles.playerWrapper}>
                <ReactPlayer 
                className={styles.videoPlayer}
                playing={true}
                controls={true} 
                width='100%'
                height='100%'
                url='https://res.cloudinary.com/revynovian/video/upload/v1635846828/binar/video-profile_wc6smo.mp4' />
              </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
