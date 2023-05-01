import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import GetForm from './Form';
import { toast } from 'react-toastify';


const Product = (props) => {

    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(props.val == "false" ? false : true);
    const [author, setAuthor] = useState();
    
    useEffect(() => {

        async function isAuthor() {
            const res = await fetch('https://shoppingapp.herokuapp.com/authorised');
            const data = await res.json();
            setAuthor(data);
        }
        isAuthor();
    }, [])

    const productDelete = (event) => {
        async function del() {
            await fetch("https://shoppingapp.herokuapp.com/product/" + props.product.product_id, {
                method: "DELETE",

            })


            if (props.from == "Main") {
                window.location.reload();
            } else {
                navigate('/Search', { replace: true });
            }

        }
        del();

    }


    const productEdit = (event) => {

        navigate('/addProduct', { state: { data: props.product }, replace: true });
    }

    const addToCart = () => {


        async function authorisation() {
            const res = await fetch("https://shoppingapp.herokuapp.com/authenticate");
            const data = await res.json();
            
            if (data === false) {
                toast.error("Please Login! ", {
                    position: 'top-center',
                    className: 'red-toast',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                navigate('/Login');
            } else {
               await fetch('https://shoppingapp.herokuapp.com/product/addtocart', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(props.product)
                })

                    .catch(error => {
                        // handle error
                    });
                setIsActive(!isActive);
            }
        
        }
        authorisation();
    }

    

    
    return (
        <Card style={isActive ? { width: '18rem', height: '26rem', border: '3px solid green', boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.3)' } : { width: '18rem', height: '26rem' }}>
            <Card.Img variant="top" style={{ height: '12rem' }} src={props.product.product_pic === null ? "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png" : props.product.product_pic} />
            <Card.Body>
                <Card.Title>{props.product.product_name}</Card.Title>
                <Card.Title>$ {props.product.product_price}</Card.Title>

                <Link to={{
                    pathname: '/Details',
                    search: `?name=${props.product.product_name}&id=${props.product.product_id}&description=${props.product.product_description}&price=${props.product.product_price}&image=${props.product.product_pic}&active=${isActive}`,
                }} style={{ textDecoration: 'none', color: 'Green', fontWeight: '700' }}>View Details...</Link><br />
                <Button variant="primary" className='my-1' onClick={addToCart}>{isActive ? "Remove from cart" : "Add to cart"}</Button><br />
                
                {author?<Button className='my-2' variant="warning" onClick={productEdit}>Edit</Button>:<></>}
                {author?<Button className='mx-2' variant="danger" onClick={productDelete}>Delete</Button>:<></>}

            </Card.Body>
        </Card>
    );



}


export default Product;