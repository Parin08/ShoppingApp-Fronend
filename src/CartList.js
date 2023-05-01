import { useEffect, useState } from "react";
import CartProduct from "./CartProduct";
const CartList = () => {

    const [data, setData] = useState([]);

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


    return (
        
        <div className="my-5">
            {data.map((item, index) => (
                <CartProduct key={index} product={item} />
            ))}
            {data.length != 0 ? <div className="text-center  w-100 my-4">
                <a href="/DeliveryOptions" className="btn btn-primary">Place order</a>
            </div> : <></>}

        </div>
    );
}

export default CartList;