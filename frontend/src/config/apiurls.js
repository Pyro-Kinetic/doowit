export const API_URLS = {
    baseUrl: `${process.env.REACT_APP_API_BASE_URL}`,
    registerUser: `${process.env.REACT_APP_API_BASE_URL}/api/authorization/register`,
    loginUser: `${process.env.REACT_APP_API_BASE_URL}/api/authorization/login`,
    logoutUser: `${process.env.REACT_APP_API_BASE_URL}/api/authorization/logout`,
    getItem: `${process.env.REACT_APP_API_BASE_URL}/api/item/get`,
    addItem: `${process.env.REACT_APP_API_BASE_URL}/api/item/add`,
    editItem: `${process.env.REACT_APP_API_BASE_URL}/api/item/edit`,
    deleteItem: `${process.env.REACT_APP_API_BASE_URL}/api/item/delete`,
    markItemAsComplete: `${process.env.REACT_APP_API_BASE_URL}/api/item/mark`,
    getSession: `${process.env.REACT_APP_API_BASE_URL}/api/authorization/session`,
}