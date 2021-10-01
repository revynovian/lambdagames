import styles from '../styles/404.module.css'
import { Container, Row, Col, Button} from "react-bootstrap";
import Link from "next/link";

const NotFound = () => {

  return (
    <div>
      <Container fluid className={styles.notfoundPage}>
        <Row className="justify-content-center vh-100 align-items-center pb-5 custom-button">
          <Col md={4} className={`${styles.background} text-white p-5 text-center`}>
            <h1>404</h1>
            <h1>Page Not Found</h1>
            <h3 className="lead">We&apos;re sorry page you requested could not be found </h3>
            <Link href="/" passHref>
            <Button  className="mt-3" variant="warning">
              Back to Homepage
            </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFound;
