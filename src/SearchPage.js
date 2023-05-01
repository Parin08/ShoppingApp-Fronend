import { useLocation } from "react-router-dom";
import Product from "./Product";
import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
const Searchpage = () => {

    const location = useLocation();
    const dataReceived = location.state?.data;

    const [cart, setCart] = useState([]);

    useEffect(() => {
        async function getProductsFromCart() {
            const res = await fetch("https://shoppingapp.herokuapp.com/product/getfromcart");
            const data = await res.json();
            setCart(data);

        }
        getProductsFromCart();
    }, [])
    if (cart.length > 0) {
        return (
            <Container>

                <Row>
                    {
                        dataReceived && dataReceived.map((item, index) => (
                            <Col key={index} xs={12} sm={6} md={4} lg={3} className='my-2'>
                                <Product key={index} product={item} val={cart.length != 0 ? cart.some(obj1 => obj1.product_id === item.product_id).toString() : ""} />
                            </Col>
                        ))
                    }
                </Row>

            </Container>
        )

    } else {
        return (

            <Container>

                <Row>
                    {
                        dataReceived && dataReceived.map((item, index) => (
                            <Col key={index} xs={12} sm={6} md={4} lg={3} className='my-2'>
                                <Product key={index} product={item} val={"false"} />
                            </Col>
                        ))
                    }
                </Row>

            </Container>
        )
    }
}

export default Searchpage;