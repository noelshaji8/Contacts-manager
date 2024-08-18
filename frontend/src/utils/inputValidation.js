
/**
 * Validates a given phone number to ensure it only contains digits.
 *
 * @param {string} phone - the phone number to be validated
 * @return {boolean} true if the phone number is valid, false otherwise
 */
export function validatePhoneNumber(phone) {
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(phone);
}

/**
 * Validates a given username to ensure it only contains letters and has a minimum length of 3 characters.
 *
 * @param {string} username - the username to be validated
 * @return {boolean} true if the username is valid, false otherwise
 */
export function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z]{3,}$/;    
    return usernameRegex.test(username);
}

/**
 * Validates a given password to ensure it meets the minimum length requirement.
 *
 * @param {string} password - the password to be validated
 * @return {boolean} true if the password is valid, false otherwise
 */
export function validatePassword(password) {
    return (password.length > 3);
}

/**
 * Validates a given email address to ensure it matches the standard email format.
 *
 * @param {string} email - the email address to be validated
 * @return {boolean} true if the email is valid, false otherwise
 */
export function validateEmail(email) {
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    return emailRegex.test(email)
}

/**
 * Validates a set of contact information to ensure it meets the required criteria.
 *
 * @param {string} name - the username to be validated
 * @param {string} phoneNo - the primary phone number to be validated
 * @param {string} email - the email address to be validated
 * @param {string} altphoneNo - the alternate phone number to be validated
 * @return {boolean} true if the contact information is valid, false otherwise
 */
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
