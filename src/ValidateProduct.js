
const ValidateProduct = (val)=>{
       
    const errs = {};
    if(val.product_name == undefined || val.product_name == ""){
        errs.name = "Please provide name."
    }
    if(val.product_price == undefined){
        errs.price = "Please provide price."
    }
    else if(val.product_price > 10000 || val.product_price <= 0){
        errs.price = "Please provide valid price"
    }
    else if(isNaN(val.product_price)){
        errs.price = "Please provide price in number format"
    }
    return errs;
}

export default ValidateProduct;