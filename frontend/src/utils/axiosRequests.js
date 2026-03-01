import axios from "axios";

export async function postUserData(url, data, handleBackdropClick, setIsLoggedIn, setMessage, setError) {
    try {
        const response = await axios.post(url, data, {withCredentials: true});
        setIsLoggedIn(response.data.isLoggedIn)
        setMessage(response.data.message);
        handleBackdropClick();
    } catch (error) {
        setError(error.response?.data?.message || error.message)
    }
}

export async function getData(url) {
    try {
        const response = await axios.get(url, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || error.message)
    }
}

export async function postData(url, data) {
    try {
        const response = await axios.post(url, data, {withCredentials: true})
        return response.data
    } catch (error) {
        console.error(error.response?.data?.message || error.message)
    }
}

export async function logoutUser(url, setIsLoggedIn, setMessage, setError) {
    try {
        const response = await axios.post(url, {}, {withCredentials: true});
        setIsLoggedIn(response.data.isLoggedIn)
        setMessage(response.data.message);
    } catch (error) {
        setIsLoggedIn(false)
        setError(error.response?.data?.message || error.message)
    }
}