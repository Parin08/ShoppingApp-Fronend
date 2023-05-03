import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Login = () => {

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
   
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("https://shoppingapp.herokuapp.com/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "password": password,
                "username": username,

            })

        })
            .then(res => { return res.json() })
            .then(data => {
                if (data == true){
                    toast.success("Login successful.", {
                        position: 'top-center',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                   
                    navigate('/')
                }
                   
                else{
                    
                    toast.error("Login fail! ", {
                        position: 'top-center',
                        className: 'red-toast',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    navigate("/login")
                }

                    
            })
            .catch(err => console.log(err))
    
            navigate(0)
         
    
            
    }

    const signup = ()=>{
        navigate('/Signup');
    }


    return (
        <>
            <Form onSubmit={handleSubmit} className='form form-login'>
                <div>
                    <h2 className='display-5 text-center text-success'>Login</h2>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </Form.Group>

                    <div classNamw="btn">
                        <Button type="submit" className='btn btn-success'>Login</Button>
                    </div>
                    <div classNamw="btn">
                        <div onClick={signup} className='loginlink'>Sign Up</div>
                    </div>
                    <div>
                        <p>For admin access</p>
                        <p>Username:pate0468</p>
                        <p>Password:3Cfe170c$</p>
                    </div>

                </div>
            </Form>
        </>
    )
}

export default Login;