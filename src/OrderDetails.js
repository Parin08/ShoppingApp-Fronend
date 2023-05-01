import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import ProductOfOrder from './ProductOfOrder';


const OrderDetails = () => {
    const location = useLocation();
    const orderData = location.state?.data;
    const [orderdata, setOrderData] = useState([]);
    const [deliverydata, setDeliveryData] = useState([]);
    useEffect((e) => {
       
        async function getOrderDetails() {
            const res = await fetch("https://shoppingapp.herokuapp.com/deliveryrDetails/" + orderData);
            const data = await res.json();
            setDeliveryData(data);

          
           
        }
        getOrderDetails();
    }, []);

    useEffect(() => {
        async function getOrderDetails() {
            const res = await fetch("https://shoppingapp.herokuapp.com/orderDetails/" + orderData);
            const data = await res.json();
            setOrderData(data);
           
        }
        getOrderDetails();
    }, []);

    function getTotalOfProducts(orderdata) {
        let total = 0;
        if (orderdata.length != 0) {
            for (const product of orderdata) {
                total += product.product_price;
            }
        }
        return total.toFixed(2);
    }

    function getGST(orderdata) {
        return  orderdata.length != 0 ? (getTotalOfProducts(orderdata) * 0.13).toFixed(2) : 0;
    }

    function total(data) {
        return (deliverydata.length != 0? Number(getTotalOfProducts(data)) + Number(orderdata.length != 0?getGST(orderdata):0) + deliverydata[0].shipping_price:0).toFixed(2);
    }

    return (
        <>
            <Table className="d-flex justify-content-center w-100 my-4">
                <tbody>
                    {
                        orderdata ? orderdata.map((item, index) => (
                            <ProductOfOrder key={index} product={item} />
                        )) : ""
                    }

                    <tr className="d-flex justify-content-end">
                        <td className="d-flex justify-content-end px-5 w-25"><><h6 className="d-inline mx-4">Subtotal:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>${getTotalOfProducts(orderdata)}</></td>
                    </tr>
                    <tr className="d-flex justify-content-end">
                        <td className="d-flex justify-content-end px-5 w-25"><><h6 className="d-inline mx-4">Gst/Hst:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>${getGST(orderdata)}</></td>
                    </tr>
                    <tr className="d-flex justify-content-end">
                        <td className="d-flex justify-content-end px-5 w-25"><><h6 className="d-inline mx-4">Shipping:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>${deliverydata.length!=0?deliverydata[0].shipping_price:'N/A'}</></td>
                    </tr>
                    <tr className="d-flex justify-content-end">
                        <td className="d-flex justify-content-end px-5 w-25"><><h6 className="d-inline mx-4">Total:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>${total(orderdata)}</></td>
                    </tr>

                </tbody>
            </Table>
        </>
    )

}

export default OrderDetails;