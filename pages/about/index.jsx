import styles from "./Aboutpage.module.css";
import { Container, Row, Col, Image} from "react-bootstrap";
import ReactPlayer from "react-player";

const About = () => {

  return (
    <div>
      <Container fluid className={`${styles.aboutPage} p-5`}>
        <Row className="justify-content-center  align-items-center py-5">
          <Col md={10} className={`d-flex text-white p-5 text-center justify-content-around align-items-center ${styles.background}`}>
            <div>
            <h1 className="display-4">BINAR</h1>
            <h1 className="display-4">GAMEHUB</h1>
            <h2 className="lead">The best place to play browser games</h2>
            <hr />
            <h4> FSW - BINAR ACADEMY </h4>
            <h4>Group 1 Wave 10</h4>
            <h6>Challenge Project Chapter 11</h6>
            <hr />
            <h6>tech stack</h6>
              <Image src="/img/icon-next.png" style={{width: "50px", height: "50px" ,margin: "10px"}} alt="next-icon"/>
              <Image src="/img/icon-bootstrap.png" style={{width: "50px", height: "50px",margin: "10px"}} alt="bootstrap-icon" />
              <Image src="/img/icon-pg.png" style={{width: "50px", height: "50px", margin:"10px" }} alt="postgresql-icon"/>
            </div>
            <div>
              <div className={styles.vl}></div>
            </div>
            <div className="ps-5">
              <ReactPlayer playing controls url='https://res.cloudinary.com/revynovian/video/upload/v1635349838/binar/sample-video_pvyupc.webm' />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
