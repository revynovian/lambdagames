import "./about-us.css";
import { Container, Row, Col, Image} from "react-bootstrap";
import reactIcon from "../../../assets/icon-react.png";
import bootstrapIcon from "../../../assets/icon-bootstrap.png";
import pgIcon from "../../../assets/icon-pg.png";

const About = () => {

  return (
    <div>
      <Container fluid className="about-page">
        <Row className="justify-content-center vh-100 align-items-center pb-5">
          <Col md={4} className="text-white p-5 text-center blur-card-custom">
            <h1 className="display-4">BINAR</h1>
            <h1 className="display-4">GAMEHUB</h1>
            <h2 className="lead">The best place to play browser games</h2>
            <hr />
            <h6>Challenge Project</h6>
            <h6>Full Stack Web Development</h6>
            <h4> BINAR ACADEMY Group 1 Wave 10</h4>
            <hr />
            <h6>tech stack</h6>
              <Image src={reactIcon} style={{width: "50px", height: "50px" ,margin: "10px"}} />
              <Image src={bootstrapIcon} style={{width: "50px", height: "50px",margin: "10px"}} />
              <Image src={pgIcon} style={{width: "50px", height: "50px", margin:"10px" }} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
