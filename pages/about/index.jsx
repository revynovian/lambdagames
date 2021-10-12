import styles from "./Aboutpage.module.css";
import { Container, Row, Col, Image} from "react-bootstrap";

const About = () => {

  return (
    <div>
      <Container fluid className={`${styles.aboutPage} p-5`}>
        <Row className="justify-content-center vh-100 align-items-center py-5">
          <Col md={4} className={`text-white p-5 text-center ${styles.background}`}>
            <h1 className="display-4">BINAR</h1>
            <h1 className="display-4">GAMEHUB</h1>
            <h2 className="lead">The best place to play browser games</h2>
            <hr />
            <h6>Challenge Project Chapter 10</h6>
            <h6>Full Stack Web Development</h6>
            <h4> BINAR ACADEMY Group 1 Wave 10</h4>
            <hr />
            <h6>tech stack</h6>
              <Image src="/img/icon-next.png" style={{width: "50px", height: "50px" ,margin: "10px"}} alt="next-icon"/>
              <Image src="/img/icon-bootstrap.png" style={{width: "50px", height: "50px",margin: "10px"}} alt="bootstrap-icon" />
              <Image src="/img/icon-pg.png" style={{width: "50px", height: "50px", margin:"10px" }} alt="postgresql-icon"/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
