// export function validateEmail(email) {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return !emailRegex.test(email);
// }

export function validatePhoneNumber(phone) {
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(phone);
}

export function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z]{3,}$/;    
    return usernameRegex.test(username);
}

export function validatePassword(password) {
    return (password.length > 3);
}

export function validateEmail(email) {
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    return emailRegex.test(email)
}

export function validCheck  (name, phoneNo, email, altphoneNo )  {
    if (!validatePhoneNumber(phoneNo)) {
        return false
    }
    if (!validateUsername(name)) {
        return false
    }
    if (email && !validateEmail(email)) {
        return false
    }
    if (altphoneNo && !validatePhoneNumber(altphoneNo)) {
        return false
    }
    return true
}
