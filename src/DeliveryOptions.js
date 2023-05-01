import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";


const Deliverycard = ({ title, selected, onClick, description, price }) => {

    return (
        <div
            className={`deliveryCard ${selected ? "selectedDeliveryOption" : ""}`}
            onClick={onClick}
        >
            <Card style={{ width: '18rem', height: '22rem' }} className="text-center bg-light">
                <h2 className="display-3 my-3">${price}</h2>
                <Card.Title className="my-3">{title}</Card.Title>
                <p className="m-3 "> {description}</p>
            </Card>
        </div>
    );
};

const DeliveryOptions = () => {

    const [selectedDelivery, setSelectedDelivery] = useState(null);

    const navigate = useNavigate();

    const handleCardClick = (typeOfDelivery,deliveryPrice, deliveryDescription) => {

        if (selectedDelivery === typeOfDelivery) {
            setSelectedDelivery(null);
        } else {
            setSelectedDelivery(typeOfDelivery);
            
            fetch("https://shoppingapp.herokuapp.com/product/shippingprocess", {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(
                    {
                        "price":deliveryPrice,
                        "deliveryName":typeOfDelivery,
                        "description": deliveryDescription
                    }
                )
            })
            navigate('/Order', { replace: true });
        }
    };

    return (
        <>

            <div className="card-container d-flex justify-content-evenly" >
                <Deliverycard
                    title="Standard Shipping"
                    selected={selectedDelivery === "Standard"}
                    onClick={() => handleCardClick("Standard Shipping",2.99, "This method uses our standard shipping service and typically takes 3-5 business days to arrive.")}
                    description={"This method uses our standard shipping service and typically takes 3-5 business days to arrive."}
                    price={2.99}
                />
                <Deliverycard
                    title="Expedited Shipping"
                    selected={selectedDelivery === "Expedited"}
                    onClick={() => handleCardClick("Expedited Shipping",8.99, "This method uses our expedited shipping service and typically takes 1-2 business days to arrive.")}
                    description={"This method uses our expedited shipping service and typically takes 1-2 business days to arrive."}
                    price={8.99}
                />
                <Deliverycard
                    title="Overnight Shipping"
                    selected={selectedDelivery === "Overnight"}
                    onClick={() => handleCardClick("Overnight Shipping",18.99, "This method uses our overnight shipping service and typically arrives the next business day.")}
                    description={"This method uses our overnight shipping service and typically arrives the next business day."}
                    price={18.99}

                />
            </div>

        </>
    );
}

export default DeliveryOptions;