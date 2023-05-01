import { Container, Row, Col, Button } from "react-bootstrap";

const Error = () => {


    return (
        <>
            <Container className="my-5">
                <Row className="justify-content-center">
                    <Col md={8} className="text-center">
                        <h1 className="mb-4">404 Page Not Found</h1>
                        <p className="lead mb-4">
                            Sorry, the page you are looking for cannot be found.
                        </p>
                        <Button variant="primary" href="/">
                            Go back to homepage
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Error;