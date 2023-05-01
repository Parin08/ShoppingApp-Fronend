import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ValidateProduct from './ValidateProduct';

const GetForm = (props) => {

    const [data, setdata] = useState({});
    const location = useLocation();
    const dataReceived = location.state?.data;
    const navigate = useNavigate();
    const [err, setErr] = useState({});
    

    const handleForm = (event) => {
        event.preventDefault();
        setErr(ValidateProduct(data));
        if (Object.keys(ValidateProduct(data)).length === 0) {

            if (!dataReceived) {
                fetch('https://shoppingapp.herokuapp.com/product', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .catch(error => {
                        // handle error
                    });
            } else {
                event.preventDefault();

                fetch('https://shoppingapp.herokuapp.com/product/' + dataReceived.product_id, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .catch(error => {
                        console.log(error)
                    });
            }
            navigate('/');
        }

    }

    useState(() => {
        if (dataReceived) {
            setdata(dataReceived);
        }
    }, [dataReceived]);

    const handleChange = (event) => {

        const { name, value } = event.target;
        setdata((formdata) => ({
            ...formdata,
            [name]: value,
        }));
    }


    return (
        <div className='d-flex justify-content-center'>

            <Form onSubmit={handleForm} className="my-5 w-50 border border-4 border-success p-4 rounded shadow-lg p-3 mb-5 bg-light">
                <h2 className='display-5 text-center text-success'>Add new product</h2>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" placeholder="Name" name="product_name" value={data.product_name} onChange={handleChange} />
                    {err.name != undefined ? <p className='text-danger'>{err.name}</p> : <></>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control type="text" placeholder="Price" name="product_price" value={data.product_price} onChange={handleChange} />
                    {err.price != undefined ? <p className='text-danger'>{err.price}</p> : <></>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Please write description here!!!" name="product_description" value={data.product_description} onChange={handleChange} />
                </Form.Group>


                <Form.Group className="mb-3" controlId="URL">
                    <Form.Label>Photo URL:</Form.Label>
                    <Form.Control type="text" placeholder="Photo URL" name="product_pic" value={data.product_pic} onChange={handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default GetForm;