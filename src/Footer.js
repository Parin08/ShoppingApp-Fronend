import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const footer = () => {

    return (
        <footer >
            <Card className="text-center" bg="light">
          
                <Card.Body>
                    <Card.Title>123 Foody Street</Card.Title>
                    <Card.Text>
                        Ottawa, Ontario
                    </Card.Text>
                    <Card.Text>
                        (613) 123-FOOD
                    </Card.Text>
                    <a href="mailto:food@gmail.ca" variant="primary">food@gmail.ca</a>

                </Card.Body>
                <Card.Footer className="text-muted">Created By Parin Patel</Card.Footer>
            </Card>

        </footer>

    )
}

export default footer;