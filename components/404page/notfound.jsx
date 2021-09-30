import "./notfound.css";
import { Container, Row, Col, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
const NotFound = () => {

  return (
    <div>
      <Container fluid className="notfound-page">
        <Row className="justify-content-center vh-100 align-items-center pb-5">
          <Col md={4} className="text-white p-5 text-center  notfound-blur">
            <h1>404</h1>
            <h1>Page Not Found</h1>
            <h3 className="lead">We're sorry page you requested could not be found </h3>
            <Button as={Link} to="/" variant="warning" className="m-3">
              Back to Homepage
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFound;
