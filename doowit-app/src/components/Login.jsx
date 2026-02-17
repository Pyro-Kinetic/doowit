import {useState} from "react";
import {postUserData} from "../utils/axiosRequests";

export default function Login({handleBackdropClick, setIsLoggedIn, setMessage, setError, error}) {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    function handleClick(e) {
        if (e.target === e.currentTarget) handleBackdropClick();
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const baseUrl = 'http://localhost:8000/api/authorization/login'

        setError('')
        setMessage('')
        postUserData(baseUrl, formData, handleBackdropClick, setIsLoggedIn, setMessage, setError)
            .then(data => {return data})
    }

    return (
        <div className="modal-backdrop-custom" onClick={handleClick}>
            <section className="modal-custom" role="dialog" aria-modal="true" aria-labelledby="login-title">
                <header className="modal-header">
                    <h1 id="login-title" className="hachi-maru-pop-regular rich-black">Login</h1>
                </header>

                <form className="modal-body" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="roboto">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="password" className="roboto">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    {error && <p className="text-danger roboto-light">{error}</p>}

                    <footer className="modal-footer">
                        <button type="submit" className="btn-primary">Login</button>
                    </footer>
                </form>
            </section>
        </div>
    );
}
