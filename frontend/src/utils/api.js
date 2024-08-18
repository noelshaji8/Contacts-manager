import axios from "axios";

const API_URL = "http://localhost:4000";

/**
 * Sign up a user by sending a POST request to the server's '/signup' endpoint with user data.
 * @param {Object} userData - The user data to be sent in the request body.
 * @returns {Promise} - A promise that resolves to the response data from the server.
 * @throws {Object} - If the request fails, throw the error response data.
 */
export const signupUser = async userData => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

/**
 * Log in a user by sending a POST request to the server's '/login' endpoint with user data.
 * @param {Object} userData - The user data to be sent in the request body.
 * @returns {Promise} - A promise that resolves to the response data from the server.
 * @throws {Object} - If the request fails, throw the error response data.
 */
export const loginUser = async userData => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

/**
 * Log out the current user by sending a GET request to the server's '/logout' endpoint.
 * @returns {Promise} - A promise that resolves to the response data from the server.
 * @throws {Object} - If the request fails, throw the error response data.
 */
export const logoutUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/logout`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

/**
 * Create a new contact by sending a POST request to the server's '/create' endpoint with contact data.
 * @param {Object} userData - The contact data to be sent in the request body.
 * @returns {Promise} - A promise that resolves to the response data from the server.
 * @throws {Object} - If the request fails, throw the error response data.
 */
export const createContact = async userData => {
    try {
        const response = await axios.post(`${API_URL}/create`, userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

/**
 * Read all contacts by sending a POST request to the server's '/read' endpoint with user data.
 * @param {Object} userData - The user data to be sent in the request body.
 * @returns {Promise} - A promise that resolves to the response data from the server.
 * @throws {Object} - If the request fails, throw the error response data.
 */
export const readContacts = async userData => {
    try {
        const response = await axios.post(`${API_URL}/read`, userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


/**
 * Update a contact by sending a PATCH request to the server's '/update' endpoint with contact data.
 * @param {Object} contactData - The contact data to be sent in the request body.
 * @returns {Promise} - A promise that resolves to the response data from the server.
 * @throws {Object} - If the request fails, throw the error response data.
 */
export const updateContact = async contactData => {
    try {
        const response = await axios.patch(`${API_URL}/update`, contactData, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

/**
 * Delete a contact by sending a DELETE request to the server's '/delete' endpoint with contact data.
 * @param {Object} contactData - The contact data to be sent in the request body.
 * @returns {Promise} - A promise that resolves to the response data from the server.
 * @throws {Object} - If the request fails, throw the error response data.
 */
export const deleteContact = async contactData => {
    try {
        const response = await axios.delete(`${API_URL}/delete`, { data: contactData, withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

/**
 * Update the user's information by sending a PATCH request to the server's '/user/update' endpoint with user data.
 * @param {Object} userData - The user data to be sent in the request body.
 * @returns {Promise} - A promise that resolves to the response data from the server.
 * @throws {Object} - If the request fails, throw the error response data.
 */
export const updateUserInfo = async userData => {
    try {
        const response = await axios.patch(`${API_URL}/user/update`, userData, { withCredentials: true });       
        return response.data;
        
    } catch (error) {
        throw error.response.data;
    }
};
