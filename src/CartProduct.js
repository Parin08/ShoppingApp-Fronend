import Card from 'react-bootstrap/Card';

const CartProduct = (props)=>{

    
const removeFromCart = (event) => {
    fetch('https://shoppingapp.herokuapp.com/product/addtocart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(props.product)
    })
        .then(response => {
            // handle response from server
        })
        .catch(error => {
            // handle error
        });
        window.location.reload();
}

    return(
        <Card className="cartproduct w-75 my-2">
        <Card.Body>
            <div className="d-flex">
                <div className="mx-3 w-25">
                    <Card.Img src={props.product.product_pic} alt= {props.product.product_name} style={{  maxHeight: "120px" }} />
                </div>
                <div className="d-flex justify-content-around w-100">
                    <div className="w-25">
                    <Card.Title>{props.product.product_name}</Card.Title>
                    <Card.Subtitle>{props.product.product_description}</Card.Subtitle>    
                    </div>                       
                    <Card.Text>Quantity: 1</Card.Text>
                    <Card.Text>Price: ${props.product.product_price}</Card.Text>
                    <button className='btn btn-danger removecart' onClick={removeFromCart}>Remove from cart</button>
                </div>
               
            </div>
            
        </Card.Body>
    </Card>
    );
}

export default CartProduct;