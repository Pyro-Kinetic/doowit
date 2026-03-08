import Login from "./Login";
import {useState} from "react";
import Register from "./Register";
import {logoutUser} from "../utils/axiosRequests";
import danceGraphic from "../assets/dancing.jpg"

export default function LoginPage({isLoggedIn, setIsLoggedIn, setShowHomePage, setShowLogin}) {
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    function toggleRegisterModal() {
        setError("")
        setMessage("");
        setShowRegisterModal(!showRegisterModal);
    }

    function toggleLoginModal() {
        setError("")
        setMessage("");
        setShowLoginModal(!showLoginModal);
    }

    function handleBackdropClick() {
        setShowRegisterModal(false);
        setShowLoginModal(false);
    }

    function handleLogout() {
        const url = 'http://localhost:8000/api/authorization/logout'

        setError('')
        setMessage('')
        logoutUser(url, setIsLoggedIn, setMessage, setError).then(res => res)
    }

    return (
        <div className="login-page home-layout container" style={{minHeight: "80vh"}}>
            <div className="left-pane d-flex align-items-center justify-content-center">
                <img src={`${danceGraphic}`} className="app-image img-fluid" alt="Illustration of three people dancing"/>
            </div>

            <div className="right-pane d-flex flex-column align-items-center justify-content-center">
                <h2 className="hachi-maru-pop-regular rich-black mb-4">Welcome to Doowit!</h2>
                <div className="d-flex gap-3">
                    {!isLoggedIn && <button onClick={toggleLoginModal}
                                            className="btn planet-background planet-hover text-light roboto">Login</button>}
                    {isLoggedIn && <button onClick={handleLogout}
                                           className="btn planet-background planet-hover text-light roboto">Logout</button>}
                    {!isLoggedIn && <button onClick={toggleRegisterModal}
                                            className="btn sun-background sun-hover text-dark roboto">Sign
                        Up
                    </button>}
                </div>
                {message && <p className="text-success roboto mt-3 text-center">{message}</p>}
                {error && <p className="text-danger roboto-light mt-3 text-center">{error}</p>}
            </div>

            {showRegisterModal &&
                <Register handleBackdropClick={handleBackdropClick} setIsLoggedIn={setIsLoggedIn}
                          setMessage={setMessage} setError={setError}
                          error={error}/>}
            {showLoginModal &&
                <Login handleBackdropClick={handleBackdropClick}
                       setShowHomePage={setShowHomePage}
                       setIsLoggedIn={setIsLoggedIn}
                       setShowLogin={setShowLogin}
                       setMessage={setMessage}
                       setError={setError}
                       error={error}/>}
        </div>
    );
}
