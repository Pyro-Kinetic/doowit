import {useState} from "react";
import Register from "./Register";
import Login from "./Login";

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
        <div className="login-page container d-flex flex-column align-items-center justify-content-center" style={{minHeight: "80vh"}}>
            <h2 className="hachi-maru-pop-regular rich-black mb-4">Welcome to Doowit!</h2>
            <div className="d-flex gap-3">
                <button onClick={toggleLoginModal} className="btn planet-background planet-hover text-light roboto">Login</button>
                <button onClick={toggleRegisterModal} className="btn sun-background sun-hover text-dark roboto">Sign Up</button>
            </div>

            {showRegisterModal && <Register handleBackdropClick={handleBackdropClick} />}
            {showLoginModal && <Login handleBackdropClick={handleBackdropClick} />}
        </div>
    );
}
