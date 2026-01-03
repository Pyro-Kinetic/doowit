import {useState} from "react";
import Register from "./Register";
import Login from "./Login";
import danceGraphic from "../assets/dancing.jpg"

export default function LoginPage() {
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    function toggleRegisterModal() {
        setShowRegisterModal(!showRegisterModal);
    }

    function toggleLoginModal() {
        setShowLoginModal(!showLoginModal);
    }

    function handleBackdropClick() {
        setShowRegisterModal(false);
        setShowLoginModal(false);
    }

    return (
        <div className="login-page home-layout container" style={{minHeight: "80vh"}}>
            <div className="left-pane d-flex align-items-center justify-content-center">
                <img src={danceGraphic} className="app-image img-fluid" alt="Illustration of three people dancing"/>
            </div>

            <div className="right-pane d-flex flex-column align-items-center justify-content-center">
                <h2 className="hachi-maru-pop-regular rich-black mb-4">Welcome to Doowit!</h2>
                <div className="d-flex gap-3">
                    <button onClick={toggleLoginModal} className="btn planet-background planet-hover text-light roboto">Login
                    </button>
                    <button onClick={toggleRegisterModal} className="btn sun-background sun-hover text-dark roboto">Sign Up
                    </button>
                </div>
            </div>

            {showRegisterModal && <Register handleBackdropClick={handleBackdropClick}/>}
            {showLoginModal && <Login handleBackdropClick={handleBackdropClick}/>}
        </div>
    );
}
