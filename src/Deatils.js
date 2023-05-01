import { Container, Row, Col, Button } from "react-bootstrap";
import { useLocation , useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Details = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const price = searchParams.get('price');
    const image = searchParams.get('image');
    const description = searchParams.get('description');
    const active = searchParams.get('active');
    
 

    const addToCart = (event) =>{
        
        fetch('https://shoppingapp.herokuapp.com/product/addtocart', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                
                    "product_id": id,
                    "product_name": name,
                    "product_price": price,
                    "product_description": description,
                    "product_pic": image
                
            })
        })
            .then(response => {
                // handle response from server
            })
            .catch(error => {
                // handle error
            });
            setTimeout(function() {
                navigate('/',{ replace:true});
              }, 500);
         
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <img style={{ height: '45rem', width: '65rem' }} src={image} alt={name} />
                    </Col>
                    <Col>
                        <div className="my-5">
                            <h3>{name}</h3>
                            <p>{description}</p>
                            <h2>${price}</h2>
                            <Button variant="primary" className='my-1' onClick={addToCart}>{active=='true' ? "Remove from cart" : "Add to cart"}</Button><br />
                    
                            <Link to={{
                                pathname: '/',
                            }} style={{ textDecoration: 'none', color: 'red' }}>Go Back</Link><br />
                        </div>
                    </Col>
                </Row>

            </Container>
        </div>
    );

}


export default Details;