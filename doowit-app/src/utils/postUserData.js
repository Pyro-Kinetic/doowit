import axios from "axios";

export async function postUserData(baseUrl, data, handleBackdropClick, setMessage, setError) {
    try {
        const response = await axios.post(baseUrl, data);
        setMessage(response.data.message);
        handleBackdropClick();
    } catch (error) {
        setError(error.response?.data?.message || error.message)
    }
}