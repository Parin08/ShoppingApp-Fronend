const ValidateSignup = (firstName, lastName, email, username, password, streetAddress, unitNumber, city, province, country) => {
    const errs = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9].{8,}$/;

    if (firstName == undefined || firstName == '') {
        errs.firstName = "Please provide first name.";
    }

    if (lastName == undefined || lastName == '') {
        errs.lastName = "Please provide last name.";
    }

    if (email == undefined || email == '') {
        errs.email = "Please provide email.";
    } else if(! emailPattern.test(email)){
        errs.email = "Not valid email.";
    }

    if (username == undefined || username == '') {
        errs.username = "Please provide username.";
    }
   
    if (password == undefined || password == '') {
        errs.password = "Please provide password.";
    } else if(! passwordPattern.test(password)){
        errs.password = "Password field should have minimum 8 characters, 1 special character, 1 uppercase character";
    }

    if (streetAddress == undefined || streetAddress == '') {
        errs.streetAddress = "Please provide street address.";
    }

    if (unitNumber == undefined || unitNumber == '') {
        errs.unitNumber = "Please provide unit number.";
    }else if(isNaN(unitNumber) || unitNumber <= 0){
        errs.unitNumber = "Please provide valid number."
    }

    if (city == undefined || city == '') {
        errs.city = "Please provide city.";
    }

    if (province == undefined || province == '') {
        errs.province = "Please provide province.";
    }

    if (country == undefined || country == '') {
        errs.country = "Please provide country.";
    }

    return errs;
}

export default ValidateSignup;