import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import ValidateSignup from './ValidateSignup';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const SignupPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [unitNumber, setUnitNumber] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [country, setCountry] = useState('Canada');
    const [errs, setErrs] = useState({});
    const navigate = useNavigate();


    const checkUsername = async (username) => {
        const res = fetch("https://shoppingapp.herokuapp.com/isunique/" + username);
        const data = res.json();
        return data;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setErrs(ValidateSignup(firstName, lastName, email, username, password, streetAddress, unitNumber, city, province, country));

        if (checkUsername(username)) {


            if (Object.keys(ValidateSignup(firstName, lastName, email, username, password, streetAddress, unitNumber, city, province, country)).length === 0) {

                fetch("https://shoppingapp.herokuapp.com/signup", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "city": city,
                        "country": country,
                        "email": email,
                        "firstName": firstName,
                        "lastName": lastName,
                        "password": password,
                        "streetAddress": streetAddress,
                        "unitNumber": unitNumber,
                        "username": username,
                        "province": province
                    })

                })
                    .catch(err => console.log(err))

                navigate(0)

            }

        }

    }

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
        setProvince('');
    };

    const provinceOptions = country === 'USA'
        ? ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
        : ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon'];

    const login = () => {
        navigate('/Login');
    }

    return (
        <>
            <Form onSubmit={handleSubmit} className='form'>
                <h2 className='display-5 text-center text-success'>Sign up</h2>
                <Form.Group controlId="firstname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                    {errs.firstName != undefined ? <p className='text-danger'>{errs.firstName}</p> : <></>}
                </Form.Group>

                <Form.Group controlId="lastname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                    {errs.lastName != undefined ? <p className='text-danger'>{errs.lastName}</p> : <></>}
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    {errs.email != undefined ? <p className='text-danger'>{errs.email}</p> : <></>}
                </Form.Group>

                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    {errs.username != undefined ? <p className='text-danger'>{errs.username}</p> : <></>}
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {errs.password != undefined ? <p className='text-danger'>{errs.password}</p> : <></>}
                </Form.Group>

                <Form.Group controlId="streetaddress">
                    <Form.Label>Street Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your street address"
                        value={streetAddress}
                        onChange={(event) => setStreetAddress(event.target.value)}
                    />
                    {errs.streetAddress != undefined ? <p className='text-danger'>{errs.streetAddress}</p> : <></>}
                </Form.Group>


                <Form.Group controlId="unitnumber">
                    <Form.Label>Unit Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your unit number"
                        value={unitNumber}
                        onChange={(event) => setUnitNumber(event.target.value)}
                    />
                    {errs.unitNumber != undefined ? <p className='text-danger'>{errs.unitNumber}</p> : <></>}
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your city"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                    />
                    {errs.city != undefined ? <p className='text-danger'>{errs.city}</p> : <></>}
                </Form.Group>

                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        as="select"
                        value={country}
                        onChange={handleCountryChange}
                    >
                        <option value="Canada">Canada</option>
                        <option value="USA">USA</option>
                    </Form.Control>
                    {errs.country != undefined ? <p className='text-danger'>{errs.country}</p> : <></>}
                </Form.Group>

                <Form.Group controlId="province">
                    <Form.Label>Province</Form.Label>
                    <Form.Control
                        as="select"
                        value={province}
                        onChange={(event) => setProvince(event.target.value)}
                    >
                        <option value="">Select a province</option>
                        {provinceOptions.map((provinceOption) => (
                            <option key={provinceOption} value={provinceOption}>{provinceOption}</option>
                        ))}
                    </Form.Control>
                    {errs.province != undefined ? <p className='text-danger'>{errs.province}</p> : <></>}
                </Form.Group>

                <div classNamw="btn">
                    <Button type="submit" className='btn btn-success' >Sign up</Button>
                    <div onClick={login} className='loginlink'>Login</div>
                </div>
            </Form>




        </>
    )
}

export default SignupPage;