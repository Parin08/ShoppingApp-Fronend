import Footer from './Footer';
import Header from './Header';
import ListOfProducts from './ListOfProducts';
import GetForm from './Form';
import Details from './Deatils';
import React from 'react';
import SearchPage from './SearchPage';
import CartList from './CartList';
import DeliveryOptions from './DeliveryOptions';
import Order from './Order';
import OrderHistory from './OrderHistory';
import OrderDetails from './OrderDetails';
import Error from './Error';
import Signup from './Signup';
import Login from './Login';
import {ToastContainer } from 'react-toastify';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import { Container, Col, Row } from "reactstrap";


function App() {
  return (
    <div className="App">


      <div className="d-flex flex-column vh-100">
        <div className="flex-grow-1">
       
          <BrowserRouter forceRefresh={true}>
            <Header />
       
            <Container>

            <ToastContainer />
              <Row>

                <Routes>
                  <Route path="/" element={<ListOfProducts />} exact />
                  <Route path="/AddProduct" element={<GetForm  />} />
                  <Route path="/Details" element={<Details />} />
                  <Route path="/Search" element={<SearchPage />} />
                  <Route path="/Cart" element={<CartList />} />
                  <Route path="/DeliveryOptions" element={<DeliveryOptions />} />
                  <Route path="/Order" element={<Order />} />
                  <Route path="/OrderHistory" element={<OrderHistory />} />
                  <Route path="/OrderDetails" element={<OrderDetails />} />
                  <Route path="/Signup" element={<Signup />} />
                  <Route path="/Login" element={<Login />} />
                  <Route path="*" element={<Error/>} />
                </Routes>

              </Row>
            </Container>
          </BrowserRouter>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
