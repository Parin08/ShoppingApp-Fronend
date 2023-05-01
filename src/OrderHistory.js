import { useState,useEffect } from "react";
import { Table } from "reactstrap";
import { useNavigate } from "react-router-dom";


const HistoryDetail = (props) => {
    const timestamp = new Date(props.order.date);
    const dateString = timestamp.toISOString().substring(0, 10);
    const navigate = useNavigate();


    function getDetails() {
       
        navigate("/OrderDetails", { state: { data: props.order.session_id } })
    }

    return (

        <tr className="">
            <td className="text-center">{dateString}</td>
            <td className="text-center">{props.order.price}</td>
            <td className="text-center">{props.order.quantity}</td>
            <td className="text-center">{props.order.shipping_type}</td>
            <td className=""><button className="btn btn-warning" onClick={getDetails}>Get Details</button></td>
        </tr>

    )

}
const OrderHistory = () => {
    const [history, setHistory] = useState([]);

useEffect(()=>{
    async function getHistory() {
        const res = await fetch("https://shoppingapp.herokuapp.com/getOrders");
        const data = await res.json();
        setHistory(data);

    }

    getHistory();
},[])   

    return (
        <>

            <Table>
                <thead>
                    <tr>
                        <th className="text-center">Order Date</th>
                        <th className="text-center">Order Price</th>
                        <th className="text-center">Number Of Products</th>
                        <th className="text-center">Type of Shipping</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history ? history.map((item, index) => (
                            <HistoryDetail key={index} order={item} />
                        )) : ""
                    }
                </tbody>
            </Table>
        </>
    );

}

export default OrderHistory;