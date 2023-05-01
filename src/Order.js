import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Table } from 'react-bootstrap';
import ProductOfOrder from "./ProductOfOrder";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Order = () => {

    const [deliveryOption, setDeliveryOption] = useState()

    const [products, setProducts] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            const res = await fetch("https://shoppingapp.herokuapp.com/product/shippingprocess");
            const data = await res.json();
            setDeliveryOption(data);
        }
        getData();
    }, []);

    useEffect(() => {
        async function getData() {
            const res = await fetch("https://shoppingapp.herokuapp.com/product/getfromcart");
            const data = await res.json();
            setProducts(data);
        }
        getData();
    }, []);

    function getTotalOfProducts(products) {
        let total = 0;
        if (products) {
            for (const product of products) {
                total += product.product_price;
            }
        }
        return total.toFixed(2);
    }

    function getGST(products) {
        return products ? (getTotalOfProducts(products) * 0.13).toFixed(2) : 1;
    }

    function total(products) {
        return deliveryOption ? (Number(getTotalOfProducts(products)) + Number(getGST(products)) + deliveryOption.price).toFixed(2) : 'N/A';
    }

    function sendOrder() {

        fetch('https://shoppingapp.herokuapp.com/products/placeorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
           
        })
            .then(response => {
                // handle response from server
            })
            .catch(error => {
                // handle error
            });
        toast.success("Order send successfully!", {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        setTimeout(function() {
            navigate("/");
          }, 2000);
       
    }

    return (
        <>
            <Table className="d-flex justify-content-center w-100 my-4">
                <tbody>
                    {
                        products ? products.map((item, index) => (
                            <ProductOfOrder key={index} product={item} />
                        )) : ""
                    }

                    <tr className="d-flex justify-content-end">
                        <td className="d-flex justify-content-end px-5 w-25"><><h6 className="d-inline mx-4">Subtotal:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>${getTotalOfProducts(products)}</></td>
                    </tr>
                    <tr className="d-flex justify-content-end">
                        <td className="d-flex justify-content-end px-5 w-25"><><h6 className="d-inline mx-4">Gst/Hst:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>${getGST(products)}</></td>
                    </tr>
                    <tr className="d-flex justify-content-end">
                        <td className="d-flex justify-content-end px-5 w-25"><><h6 className="d-inline mx-4">Shipping:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>${deliveryOption ? deliveryOption.price : 1}</></td>
                    </tr>
                    <tr className="d-flex justify-content-end">
                        <td className="d-flex justify-content-end px-5 w-25"><><h6 className="d-inline mx-4">Total:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>${total(products)}</></td>
                    </tr>

                </tbody>
            </Table>
            <div className="d-flex justify-content-center mx-2 my-4">
                <a className="btn btn-primary" onClick={sendOrder}>Confirm order</a>
            </div>
        </>
    )
}

export default Order;