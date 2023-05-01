

const ProductOfOrder = (props) => {
    return (

        <tr>
            <div className="d-flex justify-content-between px-5">
                
                    <td className="d-flex justify-content-end"><img className="thumbnail" src={props.product.product_pic} /></td>
                    <td className="d-flex justify-content-start mx-5">{props.product.product_name}</td>
                
                <td>${props.product.product_price}</td>
            </div>
        </tr>

    );
}

export default ProductOfOrder;