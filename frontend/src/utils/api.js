import axios from "axios";

const API_URL = "http://localhost:4000";

export const signupUser = async userData => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const loginUser = async userData => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createContact = async userData => {
    try {
        const response = await axios.post(`${API_URL}/create`, userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const readContacts = async userData => {
    try {
        const response = await axios.post(`${API_URL}/read`, userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const readSearchContacts = async userData => {
    try {
        const response = await axios.post(`${API_URL}/search/read`, userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateContact = async contactData => {
    try {
        const response = await axios.patch(`${API_URL}/update`, contactData, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteContact = async contactData => {
    try {
        const response = await axios.delete(`${API_URL}/delete`, { data: contactData, withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateUserInfo = async userData => {
    try {
        const response = await axios.patch(`${API_URL}/user/update`, userData, { withCredentials: true });        
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};