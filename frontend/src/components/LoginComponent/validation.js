function Validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.email === "") {
        error.email = "Name should not be empty"
    } 
    else if(!email_pattern.test(values.email)) {
        error.email = "Email Didn't match"
    }
    if(values.password === "") {
        error.password = "Password should not be empty"
    } 
    else if(!password_pattern.test(values.password)) {
        error.password = "Password didn't match"
    }
    
    if(values.confirm_password === "" || String(values.confirm_password) !== String(values.password)) {
        console.log(values.confirm_password + "___" + values.password)
        error.confirm_password = "Password not matched"
    }

    return error;
}

export default Validation;