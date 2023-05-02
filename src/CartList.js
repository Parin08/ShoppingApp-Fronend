import { useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import { useNavigate } from "react-router-dom";
const CartList = () => {

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function getCart() {
            const res = await fetch("https://shoppingapp.herokuapp.com/product/getfromcart", {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            setData(data);

        }
        getCart();
    }, []);

    const delivery = () =>{
        navigate("/DeliveryOptions")
    }

    return (
        
        <div className="my-5">
            {data.map((item, index) => (
                <CartProduct key={index} product={item} />
            ))}
            {data.length != 0 ? <div className="text-center  w-100 my-4">
                <button onClick={delivery} className="btn btn-primary">Place order</button>
            </div> : <></>}

        </div>
    );
}

export default CartList;