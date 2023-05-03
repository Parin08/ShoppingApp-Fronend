import Product from './Product'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ListOfProducts = (props) => {

    const [data, setData] = useState([]);

    const [cart, setCart] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            const res = await fetch("https://shoppingapp.herokuapp.com/products");
            const data = await res.json();
            setData(data);
        }
        getData();
    }, []);


    useEffect(() => {
        async function getProductsFromCart() {
            const res = await fetch("https://shoppingapp.herokuapp.com/product/getfromcart");
            const data = await res.json();
            setCart(data);

        }
        getProductsFromCart();
    }, [])

    
    const authorise = () => {
        async function getCartProducts() {
            const res = await fetch('https://shoppingapp.herokuapp.com/authenticate');
            const data = await res.json();
            if (data == true) {
            
                navigate('/Cart');
            } else {

                toast.error("Please Login First!", {
                    position: 'top-center',
                    className: 'red-toast',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                navigate('/Login')
            }
        }
        getCartProducts();
    }


    if (cart.length > 0) {
        return (

            <Container>
                <Row>
                    {cart.length != 0 && data.map((item, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3} className='my-2'>
                            <Product key={index} product={item} from="Main" val={cart.length != 0 ? cart.some(obj1 => obj1.product_id === item.product_id).toString() : ""} />


                        </Col>
                    ))}
                </Row>
                <div className='d-flex justify-content-center my-5 '>
                    <a href="/Cart" className='btn btn-success btn-lg'>Go To Cart</a>
                </div>
            </Container>
        )
    }
    else {
        return (

            <Container>
                <Row>
                    {data.map((item, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3} className='my-2'>
                            <Product key={index} product={item} from="Main" val={"false"} />
                        </Col>
                    ))}
                </Row>
                <div className='d-flex justify-content-center my-5 '>
                    <button className='btn btn-success btn-lg' onClick={authorise}>Go To Cart</button>
                </div>
            </Container>
        )
    }
}

export default ListOfProducts;

