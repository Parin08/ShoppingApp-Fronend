import './App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.css';



const Header = () => {

    const navigate = useNavigate();

    const [data, setdata] = useState({ Search: '' });

    const [login, setLogin] = useState();

    const [author, setAuthor] = useState();

    useEffect(() => {

        async function getCartProducts() {
            const res = await fetch('https://shoppingapp.herokuapp.com/authenticate');
            const data = await res.json();
            setLogin(data);
        }
        getCartProducts();
    }, [])


    useEffect(() => {

        async function isAuthor() {
            const res = await fetch('https://shoppingapp.herokuapp.com/authorised');
            const data = await res.json();
            setAuthor(data);
        }
        isAuthor();
    }, [])

    const serach = (event) => {
        event.preventDefault()

        async function getSearch() {
            const res = await fetch('https://shoppingapp.herokuapp.com/product/search/' + data.Search);
            const response = await res.json();
            setdata({ Search: '' })
            navigate('/Search', { state: { data: response }, replace: true });
        }
        getSearch();
    }

    const getInput = (event) => {
        setdata({ ...data, Search: event.target.value })

    }

    const authorise = (val) => {

        if (login === true && val == 'cart') {
            navigate('/Cart');

        }
        else if (login === true && val == 'history') {
            navigate('/OrderHistory');

        } else if (login === true && val == 'signout') {
            async function signout() {
                const res = await fetch('https://shoppingapp.herokuapp.com/signout');
                const data = await res.json();
                if (data === true) {
                    setLogin(false);
                    toast.success("Logout successful!", {
                        position: 'top-center',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    navigate('/Login');
                }
            }
            
            signout();

        } else if(login === false && val != 'signout') {

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
        else{
            navigate('/Login')
        }
    }

    return (

        <>

            <Nav className="d-flex justify-content-between bg-success navbar navbar-expand-lg px-5">
                <Navbar.Brand href="/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUNtdlWYmEW13EnZOLdpwdRPfP3KzJgb3MTQ&usqp=CAU" alt="Logo" className='img-fluid rounded-circle w-25 shadow bg-white rounded' /></Navbar.Brand>
                <div className='d-flex flex-row-reverse'>
                    <Nav.Item>
                        <Nav.Link onClick={() => authorise('history')} className='text-white text-uppercase link'>Order History</Nav.Link>
                    </Nav.Item>
                    {author ?
                        <Nav.Item>
                            <Nav.Link href="/AddProduct" className='text-white text-uppercase link'>Add Product</Nav.Link>
                        </Nav.Item>

                        : <></>}

                    <Nav.Item>
                        <Nav.Link href="/" className='text-white text-uppercase link'>Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => authorise('signout')} className='text-white text-uppercase link'>{login ? "Sign out" : "Sign in"}</Nav.Link>
                    </Nav.Item>


                </div>
                <form className="d-flex" onSubmit={serach}>
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="Search" value={data.Search} onChange={getInput} />
                    <button className="btn btn-info" type="submit">Search</button>
                    <div onClick={() => authorise('cart')}><FontAwesomeIcon icon={faShoppingCart} className='mx-2 h3 my-2 text-dark cart' /></div>
                </form>


            </Nav>
        </>
    )

}

export default Header;